from app import app
from app.utils import query_places, place_search
from json import dumps

@app.route('/')
def index():
    return "index"


@app.route('/api/query/',methods=['GET'])
def map_data():
    results = place_search(38.682660,-90.282520)
    locations = []
    for result in results:
        locations.append({
            'name': result['name'],
        #    # 'address': result['formatted_address'],
        #     #'phone': result['formatted_phone'],
        #     'type': result['type'],
            'languages': 'English',
            'lat': result['geometry']['location']['lat'],
            'lng': result['geometry']['location']['lng'],
            'place_id': result['place_id'],
        })
    return dumps(locations)

    