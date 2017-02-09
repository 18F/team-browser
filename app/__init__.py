from flask import Flask
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flaskext.markdown import Markdown
from .commands import REPL
import os

app = Flask(__name__)
username="news_literacy_admin"
password="1234"
#app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SECRET_KEY"] = "testing"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://"+username+":"+password+"@localhost/news_literacy_db"
db = SQLAlchemy(app)
migrate = Migrate(app,db)
manager = Manager(app)
manager.add_command('db',MigrateCommand)
manager.add_command("shell",REPL())
markdown = Markdown(app)

from app import views, models
