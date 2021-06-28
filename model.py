from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """ Store information about each user. """
    
    __tablename__ = "users"
    # username or email
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
    purchased_date = db.Column(db.DateTime, nullable=False)
    ave_price = db.Column(db.Integer, nullable=False)
    qty = db.Column(db.Integer, nullable=False)
    favorite_coin = db.Column(db.Boolean, nullable=False)
    # target_price = db.Column(db.Integer, nullable=False)


    coin = db.relationship("Coin", backref="user_coins")
    user = db.relationship("User",backref="user_coins")

    def __repr__(self):
        return f"<UserCoin user_coin_id={self.user_coin_id} coin_id={self.coin_id} qty={self.qty}>"


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