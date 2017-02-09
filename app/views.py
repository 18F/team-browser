from app import app, db
from flask import request, render_template,redirect, url_for
import json
from app.models import *
from datetime import datetime
from app import tools

#this is the only route we'll implement this weekend
@app.route("/",methods=["GET","POST"])
@app.route("/index", methods=["GET","POST"])
def index():
    tools.initialize_page("index")
    tools.increment_page_frequency_count("index", datetime.now())
    return render_template("index.html")

@app.route("/for_students",methods=["GET","POST"])
def for_students():
    tools.initialize_page("for students")
    tools.increment_page_frequency_count("for students", datetime.now())
    return render_template("for_students.html")

@app.route("/contact", methods=["GET","POST"])
@app.route("/contact-us",methods=["GET","POST"])
def contact():
    tools.initialize_page("contact")
    tools.increment_page_frequency_count("contact", datetime.now())
    return render_template("contact.html")

@app.route("/blog", methods=["GET", "POST"])
def blog():
    tools.initialize_page("blog main")
    tools.increment_page_frequency_count("blog main", datetime.now())
    return render_template("blog.html")

@app.route("/for-educators", methods=["GET", "POST"])
def for_educators():
    tools.initialize_page("for educators")
    tools.increment_page_frequency_count("for educators", datetime.now())
    return render_template("for_educators.html")

@app.route("/for-journalists", methods=["GET", "POST"])
def for_journalists():
    tools.initialize_page("for journalists")
    tools.increment_page_frequency_count("for journalists", datetime.now())
    return render_template("for_journalists.html")

@app.route("/services", methods=["GET", "POST"])
def services():
    tools.initialize_page("services")
    tools.increment_page_frequency_count("services", datetime.now())
    return render_template("services.html")

@app.route("/in-the-news", methods=["GET", "POST"])
def in_the_news():
    tools.initialize_page("in the news")
    tools.increment_page_frequency_count("in the news", datetime.now())
    return render_template("in_the_news.html")

@app.route("/journalist-fellows", methods=["GET", "POST"])
def journalist_fellows():
    tools.initialize_page("journalist fellows")
    tools.increment_page_frequency_count("journalist fellows", datetime.now())
    return render_template("journalist_fellows.html")

@app.route("/we-are-hiring", methods=["GET", "POST"])
def we_are_hiring():
    tools.initialize_page("we are hiring")
    tools.increment_page_frequency_count("we are hiring", datetime.now())
    return render_template("we_are_hiring.html")

@app.route("/news-literacy", methods=["GET","POST"])
def news_literacy():
    tools.initialize_page("news literacy")
    tools.increment_page_frequency_count("news literacy", datetime.now())
    return render_template("news_literacy.html")

@app.route("/search-results", methods=["GET","POST"])
def search_results():
    tools.initialize_page("search")
    tools.increment_page_frequency_count("search", datetime.now())
    return render_template("search_results.html")

# Postgres documentation for Python: https://github.com/EricSchles/postgres_flask_macosx
