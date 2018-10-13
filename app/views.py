from app import app
from app.utils import query_places, place_search, retrieve_details
from json import dumps

@app.route('/')
def index():
    return "index"


@app.route('/api/query/',methods=['GET'])
def map_data():
    results = place_search(38.682660,-90.282520)
    locations = []
    for result in results:
        details = retrieve_details(result['place_id'])
        if not hasattr(details,"formatted_phone_number"):
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