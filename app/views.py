from app import app
from app.utils import query_places


@app.route('/')
def index():
    return "index"


@app.route('/query/')
def map_data():
    return query_places()
    