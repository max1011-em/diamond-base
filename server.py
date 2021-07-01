"""Server for cryptocurrency app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db, User, db, connect_to_db
import crud

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

  print("\n\n","session","id",session,user_id,"\n\n")

  return jsonify({
      "user_loggedin": True,
      "message": "Logged in successfully!",
      "user_id": user_id
  })


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
  purchased_date = request.json.get("purchased_date")
  ave_price = int(request.json.get("ave_price"))
  qty = int(request.json.get("qty"))

  user = crud.get_user_by_email(user_email)
  coin = crud.get_coin_by_coin_name(coin_name)

  print("\n\n\n","user_investment", session["logged_in_user_email"],user, coin,"\n\n\n")
  
  user_coin = crud.create_user_coin(coin,
                                    user, 
                                    purchased_date, 
                                    ave_price,
                                    qty
                                    )

  new_investment = {
      "coinName": coin_name,
      "purchasedDate": purchased_date,
      "avePrice": ave_price,
      "qty": qty,
      "userCoinId": user_coin.user_id
  }

  return jsonify({"success": True, "investmentAdded": new_investment})


@app.route("/favorite-coin.json")
def get_favorite_coin_json():
  """Return a JSON response with all user favorite coins."""

  user_email = session["logged_in_user_email"]
  user = crud.get_user_by_email(user_email)
  user_coins = crud.get_user_coin_by_user_id(user.user_id)

  USER_FAVORITE_COIN = []

  for user_coin in user_coins:
    coin = crud.get_coin_by_coin_id(user_coin.coin_id)
    user_favorite_coin = {
        "coinName": coin.coin_name
    }
    USER_FAVORITE_COIN.append(user_favorite_coin)

  return jsonify({"investments": USER_FAVORITE_COIN})


@app.route("/add-favorite-coin", methods=['POST'])
def add_favorite_coin():
  """add user favorite coin."""

  coin_name = request.json.get("coin")
  user_email = session["logged_in_user_email"]

  coin = crud.get_coin_by_coin_name(coin_name)
  user = crud.get_user_by_email(user_email)
  user_coins = crud.get_user_coin_by_user_id(user.user_id)

  for user_coin in user_coins:
    if user_coin.coin_id == coin.coin_id:
      user_coin.favorite_coin = True

      new_user_favorite_coin = {
        "coinName": coin_name
      }
      db.session.commit()
      return jsonify({"success": True, "favoriteCoinAdded": new_user_favorite_coin})

  user_coin = crud.create_user_coin(coin,
                                    user, 
                                    None, 
                                    None,
                                    0
                                    )
  new_user_favorite_coin = {
        "coinName": coin_name
      }
  user_coin.favorite_coin = True
  db.session.commit()
  return jsonify({"success": True, "favoriteCoinAdded": new_user_favorite_coin})


if __name__ == "__main__":
  connect_to_db(app)
  app.run(host="0.0.0.0", debug=True, use_debugger=True, use_reloader=True)