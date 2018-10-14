import React, { Component } from "react";
import Autocomplete from 'react-autocomplete';
import GoogleMapsLoader from "google-maps";
//import styled from "styled-components";

/* Make a request to the Google Place API with our query */
function requestPlaceApi(query) {

  var url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?'
      + 'input=' + escape(query) + '&key=AIzaSyCAgU40OXQVFZ5azzF13WtS20OM8pGFCH4';
  console.log(13, url);

  return fetch(url, {mode: 'cors'}).then((response) => {
    console.log(15, response.json());
    return response.json()['predictions'];
  });
}

function geolocate(google, autocomplete) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

class SearchbarContainer extends Component {



  state = {
    value: '',
    suggestedValues: []
  }

  currentPromise = null;

  componentDidMount() {
    let options = {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15
    };

    GoogleMapsLoader.VERSION = "weekly";
    GoogleMapsLoader.KEY = "AIzaSyCAgU40OXQVFZ5azzF13WtS20OM8pGFCH4";
    GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
    GoogleMapsLoader.load(function(google) {
      var autocomplete = new google.maps.places.Autocomplete(document.getElementById('search-autocomplete'), options)
      geolocate(google, autocomplete);
    });
  }


  render() {
    return (
      <form ref="searchForm">
        <label htmlFor="search-autocomplete">Search</label>
        <Autocomplete
          inputProps={{ id: 'search-autocomplete',
                        ref: 'searchbar',
                        placeholder: 'Search...',
                        height: '1.5rem',
                        width: '20rem'
                     }}
          wrapperStyle={{ position: 'absolute',
                          display: 'inline-block',
                          zIndex: 5
          }}
          value={this.state.value}
          items={this.state.suggestedValues}
          getItemValue={(item) => item.description}
          
          // update the value and the suggested values
          onSelect={(value, item) => {
            this.setState({ value, suggestedValues: [ item ] });
          }}
          
          // update the state and forget about previous changes
          onChange={(event, value) => {
            this.setState({ value })
            this.currentPromise = null;

            // display the new list of items
            if (value.length >= 3) {
              this.currentPromise = requestPlaceApi(value)
                .then((itemsList) => {
                  this.setState({ suggestedValues: itemsList })
                });
            }
            else {
              this.currentPromise = null;
              this.setState({ suggestedValues: []})
            }
          }}
          renderMenu={children => (
            <div className="menu">
              {children}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={item.abbr}>{item.name}</div>
          )}
        />
      </form>
    )
  }
}

export default SearchbarContainer;