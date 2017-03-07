from app import app, db
from flask import request, render_template,redirect, url_for
import json
#from app.models import *
from datetime import datetime


#this is the only route we'll implement this weekend
@app.route("/",methods=["GET","POST"])
@app.route("/index", methods=["GET","POST"])
def index():
    return render_template("index.html")


@app.route("/personal_detail/<person>", methods=["GET", "POST"])
def personal_detail(person):
    #add db look up here
    #stubbed for now
    person = {
        "github":"EricSchles",
        "office":"new york",
        "skills":"few",
        "interests":"everything"
        }
    return jsonify({"person": person})


@app.route("/search-results", methods=["GET","POST"])
def search_results():
    return render_template("search_results.html")

# Postgres documentation for Python: https://github.com/EricSchles/postgres_flask_macosx
