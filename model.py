from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """ Store information about each user. """
    
    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    full_name = db.Column(db.String,nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    paper_hand_score = db.Column(db.Integer, nullable=False)
    diamond_hand_score = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"<User user_id={self.user_id} name={self.email}>"


class Coin(db.Model):
    """ Store information about each coins. """

    __tablename__ = "coins"

    coin_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    coin_id_name = db.Column(db.String, nullable=False)
    coin_name = db.Column(db.String, nullable=False)
    coin_symbol = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<Coin coin_id={self.coin_id} coin_name={self.coin_name}>"


class UserCoin(db.Model):
    """ Store information about each user's coins."""

    __tablename__ = "user_coins"

    user_coin_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    coin_id = db.Column(db.Integer, db.ForeignKey("coins.coin_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    purchased_date = db.Column(db.DateTime, nullable=True)
    init_price = db.Column(db.Float, nullable=True)
    qty = db.Column(db.Float, nullable=True)
    transaction = db.Column(db.String, nullable=True)
    favorite_coin = db.Column(db.Boolean, nullable=True)

    coin = db.relationship("Coin", backref="user_coins")
    user = db.relationship("User",backref="user_coins")

    def __repr__(self):
        return f"<UserCoin user_coin_id={self.user_coin_id} coin_id={self.coin_id} qty={self.qty}>"


class CoinArticle(db.Model):
    """ Store articles about searched coins. """

    __tablename__ = "coin_articles"

    coin_article_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    coin_id = db.Column(db.Integer, db.ForeignKey("coins.coin_id"))
    author = db.Column(db.String)
    url = db.Column(db.String, nullable=False, unique=True)
    title = db.Column(db.String, nullable=False)
    source = db.Column(db.String)
    image_url = db.Column(db.String)
    published = db.Column(db.DateTime)
    description = db.Column(db.String)

    coin = db.relationship("Coin", backref="coin_news")

    def __repr__(self):
        return f"<CoinNews coin_id={self.coin_id} title={self.title}>"

class Article(db.Model):
    """ Store articles about cryptocurrency. """

    __tablename__ = "articles"

    article_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    author = db.Column(db.String)
    url = db.Column(db.String, nullable=False, unique=True)
    title = db.Column(db.String, nullable=False)
    source = db.Column(db.String)
    image_url = db.Column(db.String)
    published = db.Column(db.DateTime)
    description = db.Column(db.String)

    def __repr__(self):

        return f"<Article article_id={self.article_id} title={self.title}>"


def connect_to_db(flask_app, db_uri="postgresql:///coins", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = flask_app
    db.init_app(flask_app)
    print("Connected to the db!")
    

if __name__ == "__main__":
    from server import app

    connect_to_db(app)