import requests

API_KEY = "AIzaSyCAgU40OXQVFZ5azzF13WtS20OM8pGFCH4"


def query_places(location=None):
    the_request = "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating,formatted_phone_number,formatted_address&key="+API_KEY
    r = requests.get(the_request)
    return r.text
