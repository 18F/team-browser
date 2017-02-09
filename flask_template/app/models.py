"""
Here the models for our database is defined.

I am using Postgres, Flask-SQLAlchemy for this application.

For an introduction to Flask-SQLAlchemy check out: http://flask-sqlalchemy.pocoo.org/2.1/

__init__ function for each model is a constructor, and is necessary to enter
""" 
from app import db

class Users(db.Model):
    """
    This model gives us a set of specific information for each user in this application
    
    parameters:
    @name - the persons name; in order first, last
    @email - the person's gsa email
    functions:
    __str__ - Returns the user name and password as an formatted string <Id: id, Username: username>
    """
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String,unique=True) 
    t = db.Column(db.Integer)
    
    def __init__(self,name,email, t):
        self.name = name
        self.email = email
        self.t = t

    def __str__(self):
        return "<name: {}, email:{}>".format(self.name,self.email)

