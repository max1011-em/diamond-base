"""Server for cryptocurrency app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db, User
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
    if not user and user.password != password:
        return jsonify({
            "user_loggedin": False,
            "message": "Unable to log in :( Please register for an account!"
        })
    
    # If we get here, user login was successful!
    return jsonify({
        "user_loggedin": True,
        "message": "Logged in successfully!"
    })


@app.route("/users", methods=['POST'])
def register_user():
    """create account."""

    email = request.json.get("email")
    name = request.json.get("name")
    password = request.json.get("password")

    user = crud.get_user_by_email(email)

    if user:
        return jsonify("false")
    else:
        crud.create_user(name,email,password)
        return jsonify("true")


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True, use_debugger=True, use_reloader=True)