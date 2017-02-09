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

# ToDos:
#  * Add location lookup support
class SiteVisits(db.Model):
    """
    This gives us impression information about a given page on the website
    
    parameters:
    @page_name - The route name of the page being visited
    @from_page - A json blob with every other page on the website and the frequency of visiting this page from those pages
    @to_page - A json blob with every other page on the website and the frequency of visiting those pages from this one
    @overall_frequency - The frequence that a page is visited    
    @monday_frequency - frequency on mondays
    @tuesday_frequency - frequency on tuesdays
    @wednesday_frequency - frequency on wednesdays
    @thursday_frequency - frequency on thursdays
    @friday_frequency - frequency on fridays
    @saturday_frequency - frequency on saturdays
    @sunday_frequency - frequency on sundays
    @weekday_frequency - frequency during the week
    @weekend_frequency - frequency during the weekend
    @morning_frequency - frequency in the morning, 5am - 11am
    @midday_frequency - frequency in during the day - 11am - 5pm
    @afterwork_frequency - frequency after work - 5pm - 9pm
    @latenight_frequency - frequency late night - 9pm - 5am
    @frequency_from_other_pages - a dictionary from another page on the website    
    functions:
    __str__ - Returns the user name and password as an formatted string <Id: id, Username: username>
    """
    __tablename__ = 'site_visits'
    id = db.Column(db.Integer, primary_key=True) 
    page_name = db.Column(db.String)
    from_page = db.Column(db.String)
    to_page = db.Column(db.String)
    overall_frequency = db.Column(db.Integer)    
    monday_frequency = db.Column(db.Integer)
    tuesday_frequency = db.Column(db.Integer)
    wednesday_frequency = db.Column(db.Integer)
    thursday_frequency = db.Column(db.Integer)
    friday_frequency = db.Column(db.Integer)
    saturday_frequency = db.Column(db.Integer)
    sunday_frequency = db.Column(db.Integer)
    weekday_frequency = db.Column(db.Integer)
    weekend_frequency = db.Column(db.Integer)
    morning_frequency = db.Column(db.Integer)
    midday_frequency = db.Column(db.Integer)
    afterwork_frequency = db.Column(db.Integer)
    latenight_frequency = db.Column(db.Integer)
    frequency_from_other_pages = db.Column(db.String)
    
    
    def __init__(
            self,
            page_name,
            from_page,
            to_page, 
            overall_frequency,    
            monday_frequency,
            tuesday_frequency,
            wednesday_frequency,
            thursday_frequency,
            friday_frequency,
            saturday_frequency,
            sunday_frequency,
            weekday_frequency,
            weekend_frequency,
            morning_frequency,
            midday_frequency,
            afterwork_frequency,
            latenight_frequency,
            frequency_from_other_pages
    ):
        self.page_name = page_name
        self.from_page = from_page
        self.to_page = to_page
        self.overall_frequency = overall_frequency
        self.monday_frequency = monday_frequency
        self.tuesday_frequency = tuesday_frequency
        self.wednesday_frequency = wednesday_frequency
        self.thursday_frequency = thursday_frequency
        self.friday_frequency = friday_frequency
        self.saturday_frequency = saturday_frequency
        self.sunday_frequency = sunday_frequency
        self.weekday_frequency = weekday_frequency
        self.weekend_frequency = weekend_frequency
        self.morning_frequency = morning_frequency
        self.midday_frequency = midday_frequency
        self.afterwork_frequency = afterwork_frequency
        self.latenight_frequency = latenight_frequency
        self.frequency_from_other_pages = frequency_from_other_pages
        
        
    def __str__(self):
        return "<name: {}, email:{}>".format(self.name,self.email)
