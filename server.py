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

  user_email = session["logged_in_user_email"]
  coin_name = request.json.get("coin_name")
  coin_id_name = request.json.get("coin_id_name")
  purchased_date = request.json.get("purchased_date")
  init_price = float(request.json.get("init_price"))
  qty = float(request.json.get("qty"))
  transaction = "Buy"

  user = crud.get_user_by_email(user_email)
  coin = crud.get_coin_by_coin_name(coin_name)


  crud.create_user_coin(coin,
                        user, 
                        purchased_date, 
                        init_price,
                        qty,
                        transaction
                        )

  return jsonify({"success": True})


@app.route("/investments.json")
def get_investments_json():
  """Return a JSON response with all investments."""

  user_email = session["logged_in_user_email"]
  user = crud.get_user_by_email(user_email)
  user_coins = crud.get_user_coin_by_user_id(user.user_id)

  user_coin_summary= {}
  USER_COIN_DATA = []
  holdings = []
  

  coin_groupby = db.session.query(UserCoin.coin_id, func.sum(UserCoin.qty)).filter(UserCoin.qty > 0).group_by(UserCoin.coin_id).all()
  
  for uniq_coin in coin_groupby:
    coin = crud.get_coin_by_coin_id(uniq_coin[0])
    url = f"https://api.coingecko.com/api/v3/coins/{coin.coin_id_name}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
    response = requests.get(url)
    data = response.json()
    uniq_coin_total = uniq_coin[1] * data["market_data"]["current_price"]["usd"]
    holdings.append({data["name"]: uniq_coin_total})
  
  print("\n\n\n",holdings,"\n\n\n")
  # for user_coin in user_coins:
  #   coin = crud.get_coin_by_coin_id(user_coin.coin_id)
    
  #   if user_coin_summary.get(coin.coin_name,""):
  #     user_coin_summary[coin.coin_name] += user_coin.init_price * user_coin.qty
  #   else: user_coin_summary[coin.coin_name] = user_coin.init_price * user_coin.qty

  #   user_investment = {
  #       "coinIdName": coin.coin_id_name,
  #       "coinName": coin.coin_name,
  #       "purchasedDate": user_coin.purchased_date,
  #       "avePrice": user_coin.init_price,
  #       "qty": user_coin.qty,
  #       "userCoinId": user_coin.user_id
  #   }
  #   USER_COIN_DATA.append(user_investment)

  return jsonify({"investments": USER_COIN_DATA, "user_coin_summary": {"bitcoin":150}})


# @app.route("/transaction.json")
# def get_transaction_json():
#   """Return a JSON response with all transactions."""

#   user_email = session["logged_in_user_email"]
#   user = crud.get_user_by_email(user_email)
#   user_coins = crud.get_user_coin_by_user_id(user.user_id)

#   user_transaction = [
#     {"bitcoin":[all the transaciton]}
#     ]

#   for user_coin in user_coins:
#     coin = crud.get_coin_by_coin_id(user_coin.coin_id)

#     if user_coin_summary.get(coin.coin_name,""):
#       user_coin_summary[coin.coin_name] += user_coin.init_price * user_coin.qty
#     else: user_coin_summary[coin.coin_name] = user_coin.init_price * user_coin.qty

    
#     USER_COIN_DATA.append(user_investment)

#   return jsonify({"transaction": USER_TRANSACTION})


@app.route("/favorite-coin.json")
def get_favorite_coin_json():
  """Return a JSON response with all user favorite coins."""

  user_email = session["logged_in_user_email"]
  user = crud.get_user_by_email(user_email)
  user_fav_coins = crud.get_user_fav_coin_by_user_id(user.user_id)

  USER_FAVORITE_COIN = []

  for user_coin in user_fav_coins:
    coin = crud.get_coin_by_coin_id(user_coin.coin_id)
    user_favorite_coin = {
        "coinName": coin.coin_name,
        "coinIdName": coin.coin_id_name
    }
    USER_FAVORITE_COIN.append(user_favorite_coin)

  return jsonify({"fav_coin": USER_FAVORITE_COIN})


@app.route("/add-favorite-coin", methods=['POST'])
def add_favorite_coin():
  """add user favorite coin."""

  coin_name = request.json.get("coinName")
  user_email = session["logged_in_user_email"]

  coin = crud.get_coin_by_coin_name(coin_name)
  user = crud.get_user_by_email(user_email)
  user_coins = crud.get_user_coin_by_user_id(user.user_id)

  for user_coin in user_coins:
    if user_coin.coin_id == coin.coin_id:
      user_coin.favorite_coin = True

      db.session.commit()
      return jsonify({"success": True})

  user_coin = crud.create_user_coin(coin,
                                    user, 
                                    None, 
                                    None,
                                    0,
                                    None
                                    )

  user_coin.favorite_coin = True
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