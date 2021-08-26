"""Script to seed database."""

import os
import json
from datetime import datetime

import crud
import model
import server

os.system("dropdb coins")
os.system("createdb coins")

model.connect_to_db(server.app)
model.db.create_all()

# Load coin data from JSON file
with open("data/coin_list.json") as f:
    coin_data = json.loads(f.read())

coins_in_db = []
for coin in coin_data:
    coin_id_name, coin_name, coin_symbol = (
        coin["id"],
        coin["name"],
        coin["symbol"]
    )

    db_coin = crud.create_coin(coin_id_name, coin_name, coin_symbol)
    coins_in_db.append(db_coin)