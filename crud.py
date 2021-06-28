from model import db, User, Coin, UserCoin, connect_to_db


def create_user(full_name, email, password):

  user = User(full_name=full_name, 
              email=email,
              password=password, 
              paper_hand_score=0, 
              diamond_hand_score=0)

  db.session.add(user)
  db.session.commit()

  return user


# def get_users():
    
#   return User.query.all()


# def get_user_by_id(user_id):

#   return User.query.get(user_id)


def get_user_by_email(email):

  return User.query.filter(User.email == email).first()


def get_user_id_by_email(email):

  return User.query.filter(User.email == email).first().user_id


def create_coin(coin_name, coin_symbol):

  coin = Coin(
      coin_name=coin_name,
      coin_symbol=coin_symbol
  )
  db.session.add(coin)
  db.session.commit()

  return coin


def get_coin_by_coin_name(coin_name):
  
  return Coin.query.filter(Coin.coin_name == coin_name).first()


def create_user_investment(coin, user, purchased_date, ave_price, qty, favorite_coin=False):
    
  user_coin = UserCoin(
      coin = coin,
      user = user,
      purchased_date=purchased_date,
      ave_price=ave_price,
      qty=qty,
      favorite_coin=favorite_coin
      )
  db.session.add(user_coin)
  db.session.commit()

  return user_coin

def get_user_investment_by_user_id(user_id):
    
  return UserCoin.query.filter_by(user_id = user_id).all()


if __name__ == "__main__":
  from server import app

  connect_to_db(app)