import os
import json

import crud
import model
import server

os.system("dropdb coins")
os.system("createdb coins")

model.connect_to_db(server.app)
model.db.create_all()


