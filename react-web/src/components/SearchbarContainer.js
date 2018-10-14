import React, { Component } from "react";
import GoogleMapsLoader from "google-maps";


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
  
  componentDidMount() {
    let options = {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15
    };

    GoogleMapsLoader.VERSION = "weekly";
    GoogleMapsLoader.KEY = "AIzaSyCAgU40OXQVFZ5azzF13WtS20OM8pGFCH4";
    GoogleMapsLoader.LIBRARIES = ["geometry", "places"];
    GoogleMapsLoader.load(function(google) {
      var autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("search-autocomplete", options)
      );
      geolocate(google, autocomplete);
    });
  }

  render() {
    return (
      <form ref="searchForm"
        style={{
          width: "100%",
          height: "100%",
          display: "block"
        }} >
      <input id="search-autocomplete" placeholder="Search here" 
        style={{
              width: "100%",
              height: "100%",
              borderRadius: "40px",
              outline: "none",
              border: "none",
              padding: "0 15px",
              fontSize: "18px"
            }} />
      </form>
    );
  }
}
export default SearchbarContainer;