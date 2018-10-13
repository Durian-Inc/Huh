from app import app
from app.utils import place_search, retrieve_details
from json import dumps
from flask import request
import geocoder


@app.route('/')
def index():
    return "index"


@app.route('/api/query/', methods=['GET'])
def map_data(): 
    latitude = request.args.get('lat')
    longitude = request.args.get('lon')
    g=geocoder.ip('me')
    if latitude is None:
        latitude = g.lat
    if longitude is None:    
        longitude = g.lng
    results = place_search(latitude, longitude)
    locations = []
    for result in results:
        details = retrieve_details(result['place_id'])
        if not hasattr(details, "formatted_phone_number"):
            details['formatted_phone_number'] = "N/A"
        locations.append({
            'name': result['name'],
            'languages': 'English',
            'lat': result['geometry']['location']['lat'],
            'lng': result['geometry']['location']['lng'],
            'place_id': result['place_id'],
            'address': details['formatted_address'],
            'phone': details['formatted_phone_number'],
            'type': details['types'][0],
        })
    return dumps(locations)
