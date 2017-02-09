from app import app, db
from flask import request, render_template,redirect, url_for
import json
from app.models import *
from datetime import datetime


#this is the only route we'll implement this weekend
@app.route("/",methods=["GET","POST"])
@app.route("/index", methods=["GET","POST"])
def index():
    return render_template("bare.html")


# Postgres documentation for Python: https://github.com/EricSchles/postgres_flask_macosx
