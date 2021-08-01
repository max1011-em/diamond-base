from model import db, User, Coin, UserCoin, Article, connect_to_db


def create_user(full_name, email, password):

  user = User(full_name=full_name, 
              email=email,
              password=password, 
              paper_hand_score=0, 
              diamond_hand_score=0)

  db.session.add(user)
  db.session.commit()

  return user


def get_user_by_email(email):

  return User.query.filter(User.email == email).first()


def get_user_id_by_email(email):

  return User.query.filter(User.email == email).first().user_id


def create_coin(coin_id_name, coin_name, coin_symbol):

  coin = Coin(
      coin_id_name=coin_id_name,
      coin_name=coin_name,
      coin_symbol=coin_symbol
  )
  db.session.add(coin)
  db.session.commit()

  return coin


def get_coins():
    
  return Coin.query.all()


def get_coin_by_coin_name(coin_name):
  
  return Coin.query.filter(Coin.coin_name == coin_name).first()
  

def get_coin_by_coin_id(coin_id):
  
  return Coin.query.filter(Coin.coin_id == coin_id).first()

def get_coin_by_coin_sym(coin_sym):
  
  return Coin.query.filter(Coin.coin_symbol == coin_sym).first()


def create_user_coin(coin, user, purchased_date, init_price, qty, total, transaction, favorite_coin=False):
    
  user_coin = UserCoin(
      coin = coin,
      user = user,
      purchased_date=purchased_date,
      init_price=init_price,
      qty=qty,
      total=total,
      transaction=transaction,
      favorite_coin=favorite_coin
      )
  db.session.add(user_coin)
  db.session.commit()

  return user_coin


def get_user_coin_by_user_id(user_id):
    
  return UserCoin.query.filter(UserCoin.user_id == user_id).all()


def get_user_fav_coin_by_user_id(user_id):
    
  return UserCoin.query.filter(UserCoin.user_id == user_id, 
                               UserCoin.favorite_coin == True ).all()


def get_article():
    
  return Article.query.all()

# def create_coin_news(coin, url, published_date, title, description):
    
#   coin_news = CoinNews(
#       coin=coin,
#       url=url,
#       published_date=published_date,
#       title=title,
#       description=description
#       )
#   db.session.add(coin_news)
#   db.session.commit()

#   return coin_news


# def get_coin_news():
    
#   return CoinNews.query.all()


# def get_coin_news_by_coin_id(coin_id):
#     coin_news = CoinNews.query.filter(CoinNews.coin_id == coin_id).all()
#     if coin_news == None:
#       return None
#     else:
#       return coin_news


if __name__ == "__main__":
  from server import app

  connect_to_db(app)



# def get_users():
    
#   return User.query.all()


# def get_user_by_id(user_id):

#   return User.query.get(user_id)