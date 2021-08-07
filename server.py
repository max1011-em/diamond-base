"""Server for cryptocurrency app."""
import os
from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db, User, db, connect_to_db, UserCoin, Coin
import crud
from news_api_functions import *
import requests
from apikey import NEWS_API_KEY
from sqlalchemy.sql import func

app = Flask(__name__)
app.secret_key = "dev"
GENERAL_NEWS = []

@app.route("/")
def homepage():
  """View homepage."""

  return render_template("index.html")


@app.route("/<path>")
def route(path):

  return render_template("index.html")


@app.route("/<path>/<code>")
def nested_route(path, code):

    return render_template("index.html")


@app.route("/login-process", methods=['POST'])
def process_login():
  """look up the user."""

  username = request.json.get("username")
  password = request.json.get("password")
  
  user = User.query.filter_by(email=username).first()

  if not user or user.password != password:
      return jsonify({
          "user_loggedin": False,
          "message": "Unable to log in :( Please register for an account!"
      })
  
  session["logged_in_user_email"] = user.email
  user_id = crud.get_user_id_by_email(username)

  return jsonify({
      "user_loggedin": True,
      "message": "Logged in successfully!",
      "user_id": user_id
  })


@app.route("/logout-process", methods=['POST'])
def process_logout():
  """delete the session"""

  logout = request.json.get("logout","")
  
  if logout:
    del session["logged_in_user_email"]
    print(session)

  return jsonify({
      "userLogin": False
  })


@app.route("/session")
def get_session():
  user_email = session.get("logged_in_user_email","")

  print("\n\n\n","useremail",user_email,"\n\n\n")

  if user_email:
    return jsonify({"hasSession": True})
  else:
    return jsonify({"hasSession": False})


@app.route("/users", methods=['POST'])
def register_user():
  """create account."""

  email = request.json.get("email")
  name = request.json.get("name")
  password = request.json.get("password")

  user = crud.get_user_by_email(email)

  if user:
      return jsonify(False)
  else:
      crud.create_user(name,email,password)
      return jsonify(True)


@app.route("/coins.json")
def get_coins_json():
  coins = crud.get_coins()

  COINS = []
  
  for coin in coins:

    COINS.append({"coin_id_name": coin.coin_id_name,
                  "coin_name": coin.coin_name})

  return jsonify({"coins": COINS})


@app.route("/add-investment", methods=['POST'])
def add_user_investment():
  """add user investment"""

  coin_name = request.json.get("coin_name")
  coin_id_name = request.json.get("coin_id_name")
  date = request.json.get("date")
  price = float(request.json.get("price"))
  qty = float(request.json.get("qty"))
  total = price * qty
  transaction = request.json.get("transaction")

  user = crud.get_user_by_email(session["logged_in_user_email"])
  coin = crud.get_coin_by_coin_name(coin_name)

  if transaction == "Sell" :
    price = -abs(price)
    qty = -abs(qty)
    total = -abs(total)
    
  crud.create_user_coin(coin,
                        user, 
                        date, 
                        price,
                        qty,
                        total,
                        transaction
                        )

  return jsonify({"success": True})


@app.route("/investments.json")
def get_investments_json():
  """Return a JSON response with all investments."""

  user = crud.get_user_by_email(session["logged_in_user_email"])
  user_coins = crud.get_user_coin_by_user_id(user.user_id)

  holdings = []

  coin_groupby = db.session.query(UserCoin.coin_id, func.sum(UserCoin.qty), func.sum(UserCoin.init_price), func.sum(UserCoin.total)).filter(UserCoin.user_id == user.user_id, UserCoin.qty != 0).group_by(UserCoin.coin_id).all()

  for uniq_coin in coin_groupby:
    coin = crud.get_coin_by_coin_id(uniq_coin[0])
    url = f"https://api.coingecko.com/api/v3/coins/{coin.coin_id_name}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
    response = requests.get(url)
    data = response.json()
    ave_price = round(uniq_coin[3]/uniq_coin[1], 2)
    equity = round(uniq_coin[1] * data["market_data"]["current_price"]["usd"],2)
    image = data["image"]["large"]
    totalReturn = round((equity) - (ave_price * uniq_coin[1]),2)
    
    holdings.append({
      "coinName":data["name"], 
      "qty":uniq_coin[1], 
      "equity": equity, 
      "img":image,
      "sym": data["symbol"],
      "curPrice": data["market_data"]["current_price"]["usd"],
      "totalReturn": totalReturn, 
      "avePrice": ave_price
      })

  return jsonify({"investments": [], "holdings": holdings})


@app.route("/transaction.json")
def get_transaction_json():
  """Return a JSON response with all transactions by coin name."""
  coin_sym = request.args.get("sym")

  user = crud.get_user_by_email(session["logged_in_user_email"])
  uniq_coin = crud.get_coin_by_coin_sym(coin_sym)

  query_uniq_coin = db.session.query(UserCoin).filter(UserCoin.user_id == user.user_id, UserCoin.qty != 0, UserCoin.coin_id == uniq_coin.coin_id).order_by(UserCoin.purchased_date.desc()).all()

  transaction = []
  
  for coin in query_uniq_coin:
    transaction.append({
      "coinName": uniq_coin.coin_name,
      "type": coin.transaction,
      "price": coin.init_price,
      "qty": coin.qty,
      "date": coin.purchased_date,
      "cost": abs(coin.total),
      "userCoinId": coin.user_coin_id
    })

  return jsonify({"transaction": transaction})


@app.route("/remove-transaction", methods=['POST'])
def remove_transaction():
  """remove selected transaction"""

  user_coin_id = request.json.get("userCoinId")
  UserCoin.query.filter_by(user_coin_id=user_coin_id).delete()
  
  db.session.commit()
  
  return jsonify({"success": True})


@app.route("/favorite-coin.json")
def get_favorite_coin_json():
  """Return a JSON response with all user favorite coins."""

  user = crud.get_user_by_email(session["logged_in_user_email"])
  user_fav_coins = db.session.query(UserCoin.coin_id).filter(UserCoin.user_id == user.user_id, UserCoin.favorite_coin == True).group_by(UserCoin.coin_id).all()

  USER_FAVORITE_COIN = []

  for user_coin in user_fav_coins:
    coin = crud.get_coin_by_coin_id(user_coin.coin_id)
    url = f"https://api.coingecko.com/api/v3/coins/{coin.coin_id_name}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
    response = requests.get(url)
    data = response.json()

    user_favorite_coin = {
        "coinName": coin.coin_name,
        "coinIdName": coin.coin_id_name,
        "img": data["image"]["large"],
        "curPrice": data["market_data"]["current_price"]["usd"],
        "coinId": coin.coin_id
    }

    USER_FAVORITE_COIN.append(user_favorite_coin)

  return jsonify({"fav_coin": USER_FAVORITE_COIN})


@app.route("/add-favorite-coin", methods=['POST'])
def add_favorite_coin():
  """add user favorite coin."""

  coin_name = request.json.get("coinName")
  coin = crud.get_coin_by_coin_name(coin_name)
  user = crud.get_user_by_email(session["logged_in_user_email"])
      
  user_coins = UserCoin.query.filter(User.user_id == user.user_id,UserCoin.coin_id == coin.coin_id).all()

  if user_coins:
    for user_coin in user_coins:
      user_coin.favorite_coin = True
      db.session.commit()
    return jsonify({"success": True})  

  user_coin = crud.create_user_coin(coin,
                                    user, 
                                    None, 
                                    None,
                                    0,
                                    0,
                                    None
                                    )
  user_coin.favorite_coin = True
  db.session.commit()
  return jsonify({"success": True})


@app.route("/remove-fav_coin", methods=['POST'])
def remove_fav_coin():
  """remove user favorite coin"""

  coin_id = request.json.get("coinId")
  user = crud.get_user_by_email(session["logged_in_user_email"])

  user_fav_coins = crud.get_user_fav_coin(user.user_id,coin_id)

  for user_coin in user_fav_coins:
    user_coin.favorite_coin = False
    db.session.commit()
  
  return jsonify({"success": True})


@app.route("/coin-news")
def get_coin_news():
  """Return searched coin article."""
  coin_name = request.args.get("name").replace(" ","").lower()
  news = get_coin_news_articles(coin_name)

  return jsonify({"articles": news})


@app.route("/article.json")
def get_article_json():
  """Return a JSON response with cryptocurrency article."""
  articles_db = crud.get_article()

  articles = []

  for article in articles_db:
    new_article = {
                    "author": article.author,
                    "url": article.url,
                    "title": article.title,
                    "source": article.source,
                    "image_url": article.image_url,
                    "published": article.published,
                    "description": article.description
                   }
    articles.append(new_article)
  return jsonify({"articles": articles})



if __name__ == "__main__":
  connect_to_db(app)
  app.run(host="0.0.0.0", debug=True, use_debugger=True, use_reloader=True)



# @app.route("/add-coin-news", methods=['POST'])
# def add_coin_news():
#   """add searched coin news."""

#   coin_name = request.json.get("coinName")
#   coin = crud.get_coin_by_coin_name(coin_name)
#   coin_news = crud.get_coin_news_by_coin_id(coin.coin_id)
  # print("\n\n\n", coin_news,"\n\n\n")

  # url = f"https://newsapi.org/v2/everything?q={search_term}&apiKey="
  # response = requests.get(url)
  # data = response.json()
  # coin_news = data['articles'][:3]

  # if search_term == "cryptocurrency" :
  #   GENERAL_NEWS.append(data['articles'][:5])

  
  # for news in coin_news:
  #   crud.create_coin_news(coin, news["url"], news["publishedAt"], news["title"], news["description"])

  # return "test"