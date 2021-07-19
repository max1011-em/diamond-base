"""Server for cryptocurrency app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db, User, db, connect_to_db, UserCoin
import crud
import requests


app = Flask(__name__)
app.secret_key = "dev"


@app.route("/")
def homepage():
  """View homepage."""

  return render_template("index.html")


@app.route("/<path>")
def route(path):

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


@app.route("/session")
def get_session():
  user_email = session["logged_in_user_email"]

  print("\n\n\n",user_email,"\n\n\n")

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


@app.route("/investments.json")
def get_investments_json():
  """Return a JSON response with all investments."""

  user_email = session["logged_in_user_email"]
  user = crud.get_user_by_email(user_email)
  user_coins = crud.get_user_coin_by_user_id(user.user_id)

  USER_COIN_DATA = []

  for user_coin in user_coins:
    coin = crud.get_coin_by_coin_id(user_coin.coin_id)
    user_investment = {
        "coinIdName": coin.coin_id_name,
        "coinName": coin.coin_name,
        "purchasedDate": user_coin.purchased_date,
        "avePrice": user_coin.ave_price,
        "qty": user_coin.qty,
        "userCoinId": user_coin.user_id
    }
    USER_COIN_DATA.append(user_investment)

  return jsonify({"investments": USER_COIN_DATA})


@app.route("/add-investment", methods=['POST'])
def add_user_investment():
  """add user investment"""

  user_email = session["logged_in_user_email"]
  coin_name = request.json.get("coin_name")
  coin_id_name = request.json.get("coin_id_name")
  print("\n\n\n","idname",coin_id_name,"\n\n\n")
  purchased_date = request.json.get("purchased_date")
  ave_price = float(request.json.get("ave_price"))
  qty = float(request.json.get("qty"))

  user = crud.get_user_by_email(user_email)
  coin = crud.get_coin_by_coin_name(coin_name)
  user_coin = UserCoin.query.filter_by(coin_id=coin.coin_id).first()

  if not user_coin:
    crud.create_user_coin(coin,
                          user, 
                          purchased_date, 
                          ave_price,
                          qty
                          )
    new_investment = {
        "coinName": coin_name,
        "coinIdName": coin_id_name,
        "purchasedDate": purchased_date,
        "avePrice": ave_price,
        "qty": qty
    }
    return jsonify({"success": True, "investmentAdded": new_investment})

  else:
    user_coin.purchased_date = purchased_date
    user_coin.ave_price = ave_price
    user_coin.qty = qty
    db.session.commit()
    new_investment = {
        "coinName": coin_name,
        "coinIdName": coin_id_name,
        "purchasedDate": purchased_date,
        "avePrice": ave_price,
        "qty": qty
    }
    return jsonify({"success": True, "investmentAdded": new_investment})



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
        "userCoinId": user_coin.user_id
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
                                    0
                                    )

  user_coin.favorite_coin = True
  db.session.commit()
  return jsonify({"success": True})


# @app.route("/coin-news")
# def get_coin_news():
  
#   url = "https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=dcfffe03d27144269d6e5cfc90d60628"
#   response = requests.get(url)
#   data = response.json()
#   #shedule update the news
#   return jsonify(data['articles'][:5])


@app.route("/connect-coinbase")
def connect_coinbase():

  url = f"https://www.coinbase.com/oauth/authorize?response_type=code&client_id=1532c63424622b6e9c4654e7f97ed40194a1547e114ca1c682f44283f39dfa49&redirect_uri=https%3A%2F%2Fexample.com%2Foauth%2Fcallback&state=134ef5504a94&scope=wallet:user:read,wallet:accounts:read"

  response = requests.get(url)
  data = response.json()
  print(data)
  # return jsonify(data)
  return "test"


if __name__ == "__main__":
  connect_to_db(app)
  app.run(host="0.0.0.0", debug=True, use_debugger=True, use_reloader=True)
