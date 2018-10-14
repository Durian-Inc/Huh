import requests
import sqlite3 as sql


API_KEY = "AIzaSyCAgU40OXQVFZ5azzF13WtS20OM8pGFCH4"
DATABASE = "api/app/database/database.db"


def query_places(location=None):
    request_url = ("""
        https://maps.googleapis.com/maps/api/place/details/json
        ?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&
        fields=name,rating,formatted_phone_number,formatted_address&
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
    marker = None
    command = "SELECT * FROM Markers WHERE m_id = '{}'".format(place_id)
    with sql.connect(DATABASE) as connection:
        cur = connection.cursor()
        cur.execute(command)
        marker = cur.fetchall()
        cur.close()
    return marker


def add_entry_to_table(new_entry, table_name):
    new_entry['name'] = new_entry['name'].replace("'", "\\")
    columns = ', '.join(new_entry.keys())
    place_holders = ', '.join('?'*len(new_entry))
    insert_command = "INSERT INTO {} ({}) Values ({})".format(table_name, columns, place_holders)
    with sql.connect(DATABASE) as connection:
        cur = connection.cursor()
        cur.execute(insert_command, list(new_entry.values()))
        connection.commit()
        cur.close()

def aggregate_the_markers(result_id):
    # ToDo: Functionality to actually aggregate the data
    pass