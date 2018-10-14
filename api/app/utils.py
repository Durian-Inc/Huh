import requests
import sqlite3 as sql
import re


API_KEY = "AIzaSyCAgU40OXQVFZ5azzF13WtS20OM8pGFCH4"
DATABASE = "../api/app/database/database.db"


def query_places(location=None):
    request_url = ("""
        https://maps.googleapis.com/maps/api/place/details/json
        ?fields=name,rating,formatted_phone_number,formatted_address&
        key="""+API_KEY)
    r = requests.get(request_url)
    return r.text


def find_nearby_places(lat, lng, query=None):
    if query is None:
        request_url = (
            "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
            + "location="+str(lat)+","+str(lng)+"&radius=1500&fields=name&"
            + "key="+API_KEY)
    else:
        query = query.replace(' ', '%20')
        request_url = (
            "https://maps.googleapis.com/maps/api/place/textsearch/json?"
            "query="+query+"&location="+str(lat)+","+str(lng)+"&radius=1500&fields=name"
            + "&key="+API_KEY)
    r = requests.get(request_url)
    return r.json()["results"]


def retrieve_details(place_id):
    request_url = (
        "https://maps.googleapis.com/maps/api/place/details/json?"
        "placeid="+str(place_id)+"&"
        + "fields=formatted_address,formatted_phone_number,types&"
        + "key="+API_KEY)
    r = requests.get(request_url)
    return r.json()["result"]


def parse_marker(result):
    details = retrieve_details(result['place_id'])
    if not hasattr(details, "formatted_phone_number"):
        details['formatted_phone_number'] = "N/A"
    return ({
        'm_id': result['place_id'],
        'm_address': details["formatted_address"],
        'm_phone': details['formatted_phone_number'],
        'm_name': result['name'],
        'lat': result['geometry']['location']['lat'],
        'lng': result['geometry']['location']['lng'],
    })

def marker_query(place_id=None):
    markers = []
    command = "SELECT * FROM Markers"
    with sql.connect(DATABASE) as connection:
        cur = connection.cursor()
        cur.execute(command)
        markers = cur.fetchall()
        cur.close()
    return markers


def event_query(lat, lon):
    custom_event = None
    command = "SELECT * FROM Events WHERE lat={} AND lon={}".format(lat, lon)
    with sql.connect(DATABASE) as connection:
        cur = connection.cursor()
        cur.execute(command)
        custom_event = cur.fetchall()
        cur.close()
    return marker

def add_entry_to_table(new_entry, table_name):
    if table_name == 'Markers':
        new_entry['name'] = new_entry['name'].replace("'", "\\")
    elif table_name == 'Events':
        new_entry['e_name'] = new_entry['e_name'].replace("'", "\\")        
    columns = ', '.join(new_entry.keys())
    place_holders = ', '.join('?'*len(new_entry))
    insert_command = "INSERT INTO {} ({}) Values ({})".format(table_name, columns, place_holders)
    with sql.connect(DATABASE) as connection:
        cur = connection.cursor()
        cur.execute(insert_command, list(new_entry.values()))
        connection.commit()
        cur.close()

def aggregate_the_markers(result_id):
    select_command = ('''
        SELECT e_id, e_name, Markers.m_id, e_type, lang, Ratings.r_id, l_rating, m_address, m_phone, m_name, Markers.lat, Markers.lng, p_rating, c_rating
        FROM Events, Literacy, Markers, Ratings
        WHERE Markers.m_id = '{}' AND Markers.m_id = Ratings.m_id AND Ratings.r_id = Literacy.r_id AND Markers.m_id = Events.m_id
        ''').format(result_id)
    with sql.connect(DATABASE) as connection:
        cur = connection.cursor()
        cur.execute(select_command)
        aggregate = cur.fetchall()
        cur.close()
    return aggregate

def find_lang(results,lang):
    final = []
    for result in results:
        select_command =( '''
        SELECT count(lang )
        FROM Literacy, Ratings, Markers
        WHERE lang = {} AND Markers.m_id = '{}' AND Literacy.r_id = Ratings.r_id AND Ratings.m_id = Makers.m_id
        ''').format(lang,result['place_id'])
        with sql.connect(DATABASE) as connection:
            cur = connection.cursor()
            cur.execute(select_command)
            count = cur.fetchall()
            cur.close()
        if count > 0:
            final.append(result[''])
    return final
