from flask import jsonify, request

import geocoder
from app import app
from app.utils import (add_entry_to_table, find_nearby_places, marker_query,
                       retrieve_details, parse_marker, aggregate_the_markers,
                       find_lang, event_query)
from hashlib import sha256
import uuid


@app.route('/')
def index():
    return "index"


@app.route('/api/query/', methods=['GET'])
def extension_query():
    # ToDo: Fix the phone numbers?
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    text_query = request.args.get('query')

    geocode = geocoder.ip('me')
    if lat is None:
        lat = geocode.lat
    if lon is None:
        lon = geocode.lng

    results = find_nearby_places(lat, lon, query=text_query)
    locations = []
    markers = []
    for result in results[0:3]:
        markers.append(parse_marker(result))
    return jsonify(markers)


@app.route('/api/data/map', methods=['GET'])
def map_data():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    text_query = request.args.get('query')

    geocode = geocoder.ip('me')
    if lat is None:
        lat = geocode.lat
    if lon is None:
        lon = geocode.lng
    
    all_markers = []
    results = find_nearby_places(lat, lon, query=text_query)
    for result in results[0:3]:
        result_id = result['place_id']
        marker = marker_query(result_id)
        if marker is not None:
            all_markers.append(aggregate_the_markers(result_id))
        else:
            add_entry_to_table(parse_marker(result), table_name="Markers")
    return jsonify(all_markers+event_query(lat, lon))


@app.route('/api/create/event', methods=['GET'])
def create_new_event():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    locations = find_nearby_places(lat, lon)

    event_descrip = request.args.get('event_descrip')
    event_name = request.args.get('event_name')
    event_type = request.args.get('event_type')

    if locations != []:   
        new_event = {
            'e_id': sha256(str(event_name).encode('utf-8')).hexdigest(),
            'e_name': event_name,
            'e_descrip': event_descrip,
            'e_type': event_type,
            'm_id': locations[0]["place_id"],
            'lat': lat,
            'lon': lon
        }
    else:
        new_event = {
            'e_id': sha256(str(event_name).encode('utf-8')).hexdigest(),
            'e_name': event_name,
            'e_descrip': event_descrip,
            'e_type': event_type,
            'lat': lat,
            'lon': lon
        }

    add_entry_to_table(new_event, "Events")
    return jsonify(new_event)

@app.route('/api/create/literacy', methods=['GET'])
def most_literate():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    lang = request.args.get('lang')
    g = geocoder.ip('me')
    if lat is None:
        lat = g.lat
    if lon is None:
        lon = g.lng
    results = find_nearby_places(lat, lon)
    final = find_lang(results,lang)
    return jsonify(final)


@app.route('/api/create/rating', methods=['GET'])
def create_new_rating():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    locations = find_nearby_places(lat, lon)
    uid = uuid.uuid1()
    if locations != []:
        rating = {
            'r_id': str(uid),
            'm_id': locations[-1]['place_id'],
            'p_rating': request.args.get('plevel'),
            'c_rating': request.args.get('clevel'),
            'descrip': request.args.get('descrip')
        }
    else:
       rating = {
            'r_id': str(uid),
            'm_id': "none",
            'p_rating': request.args.get('plevel'),
            'c_rating': request.args.get('clevel'),
            'descrip': request.args.get('descrip')
        } 

    add_entry_to_table(rating, table_name="Ratings")
    return jsonify(rating)