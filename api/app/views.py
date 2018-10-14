from flask import jsonify, request

import geocoder
from app import app
from app.utils import (add_entry_to_table, find_nearby_places, marker_query,
                       retrieve_details, parse_marker, aggregate_the_markers,
                       find_lang)


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
    return jsonify(all_markers)

@app.route('/api/literacy', methods=['GET'])
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
