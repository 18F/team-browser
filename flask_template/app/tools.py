from app.models import SiteVisits
from app import db
import json
import plotly
from plotly.graph_objs import Bar,Layout,Scatter, Box, Annotation,Marker,Font,XAxis,YAxis
import shutil

# page based logging
def initialize_page(page_name):
    if SiteVisits.query.filter_by(page_name=page_name).count() == 0:
        page = SiteVisits(
            page_name,
            json.dumps({}), # from_page
            json.dumps({}), # to_page
            0, # overall_frequency
            0, # monday_frequency
            0, # tuesday_frequency
            0, # wednesday_frequency
            0, # thursday_frequency
            0, # friday_frequency
            0, # saturday_frequency
            0, # sunday_frequency
            0, # weekday_frequency
            0, # weekend_frequency
            0, # morning_frequency
            0, # midday_frequency
            0, # afterwork_frequency
            0, # latenight_frequency
            json.dumps({}) # frequency_from_other_pages
        )  

        db.session.add(page)
        db.session.commit()
        return "initialized"
    else:
        return "already initialized"

def get_domain(url):
    if "/" in url.split("//")[1]:
        return url.split("//")[1].split("/")[0]
    else:
        return url.split("//")[1]
    
def increment_page_frequency_count(page_name, timestamp):
    """
    This function updates analytics based on when they visited the page.
    
    input:
    @page_name - assumed to be a string passed in from the route
    @timestamp - when the page was visited, assumed to be a python datetime object
    
    output:
    Output is sent to the database and the database object is returned 
    for debugging purposes
    """

    # from_page_domain = get_domain(from_page)
    # to_page_domain = get_domain(to_page)
    page = SiteVisits.query.filter_by(page_name=page_name).first()
    page.overall_frequency += 1

    # time of day frequency 
    if timestamp.hour >= 0 or timestamp.hour <= 5 or timestamp.hour >= 21:
        page.latenight_frequency += 1
    elif timestamp.hour >= 6 or timestamp.hour <= 11:
        page.morning_frequency += 1
    elif timestamp.hour >= 12 or timestamp.hour <= 17:
        page.midday_frequency += 1
    elif timestamp.hour >= 18 or timestamp.hour <= 20:
        page.afterwork_frequency += 1
    
    # day of week frequency
    if timestamp.weekday() == 0:
        page.monday_frequency += 1
    elif timestamp.weekday() == 1:
        page.tuesday_frequency += 1
    elif timestamp.weekday() == 2:
        page.wednesday_frequency += 1
    elif timestamp.weekday() == 3:
        page.thursday_frequency += 1
    elif timestamp.weekday() == 4:
        page.friday_frequency += 1
    elif timestamp.weekday() == 5:
        page.saturday_frequency += 1
    elif timestamp.weekday() == 6:
        page.sunday_frequency += 1

    # page visit during the week
    if timestamp.weekday() < 5:
        page.weekday_frequency += 1
    else:
        page.weekend_frequency += 1

    db.session.add(page)
    db.session.commit()
    return page


def weekday_vs_weekend(page_name):
    filename = "app/templates/"+page_name+"_weekday_v_weekend.html"
    page = SiteVisits.query.filter_by(page_name=page_name).first()
        
    x_vals = ["overall page visits", "weekday", "weekend"] 
    y_vals = [page.overall_frequency,
              page.weekday_frequency, page.weekend_frequency]
        
    plotly.offline.plot({
        "data":[Bar(x=x_vals,y=y_vals)],
        "layout":Layout(
            title="Visits During the Week and During the Weekend"
        )
    },auto_open=False)
    shutil.move("temp-plot.html",filename)

def weekly_breakdown_of_visits(page_name):
    filename = "app/templates/"+page_name+"_weekly_breakdown_of_visits.html"
    page = SiteVisits.query.filter_by(page_name=page_name).first()
    lang_dict = {}
        
    x_vals = [ "overall page visits", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] 
    y_vals = [
        page.overall_frequency,
        page.monday_frequency, page.tuesday_frequency,
        page.wednesday_frequency, page.thursday_frequency,
        page.friday_frequency, page.saturday_frequency, page.sunday_frequency
    ]
        
    plotly.offline.plot({
        "data":[Bar(x=x_vals,y=y_vals)],
        "layout":Layout(
            title="Visits Over The Days Of The Week"
        )
    },auto_open=False)
    shutil.move("temp-plot.html",filename)

def time_of_day_breakdown_of_visits(page_name):
    filename = "app/templates/"+page_name+"_time_of_day_breakdown_of_visits.html"
    page = SiteVisits.query.filter_by(page_name=page_name).first()
    lang_dict = {}
        
    x_vals = ["overall page visits","morning", "mid day", "afterwork", "latenight"] 
    y_vals = [
        page.overall_frequency,
        page.morning_frequency, page.midday_frequency,
        page.afterwork_frequency, page.latenight_frequency
    ]
        
    plotly.offline.plot({
        "data":[Bar(x=x_vals,y=y_vals)],
        "layout":Layout(
            title="Visits Over The Course Of A Day"
        )
    },auto_open=False)
    shutil.move("temp-plot.html",filename)
