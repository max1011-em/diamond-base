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


def get_users():
    
    return User.query.all()


def get_user_by_id(user_id):

    return User.query.get(user_id)


def get_user_by_email(email):

    return User.query.filter(User.email == email).first()


def create_coins(coin_name, coin_ticker):
    
    coin = Coin(
        coin_name=coin_name,
        coin_ticker=coin_ticker
        )
    db.session.add(coin)
    db.session.commit()

    return coin


def get_coins():

    return Coins.query.all()


def get_coin_by_id(coin_id):

    return Coin.query.get(coin_id)


if __name__ == "__main__":
    from server import app

    connect_to_db(app)