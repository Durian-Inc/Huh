import React, { Component } from "react";
import GoogleMapsLoader from "google-maps";
//import styled from "styled-components";

/*const Map = styled.div`
  height: 100%;
  width: 100%;
`;
*/
class MapContainer extends Component {
  componentDidMount() {
    let el = this.refs.map;
    let options = {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15
    };
    GoogleMapsLoader.VERSION = "weekly";
    GoogleMapsLoader.KEY = "AIzaSyBJvbWiKq1qbKHdyFcv8_p-UBuA7IK9rr4";
    GoogleMapsLoader.load(function(google) {
      var map = new google.maps.Map(el, options);
      var infoWindow = new google.maps.InfoWindow();

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
          browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
      }

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            map.setCenter(pos);
          },
          function() {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

      /*
      ListOfPlaces = [
          {
            "name": string  name of the place/event ,
            "address1": string /* address line 1 ,
            "address2": string /* address line 2 ,
            "address3": string /* address line 3 ,
            "phone": string /* phone number contact,
            "type": string /* is this an event, business, or job hiring?
            "languages": [string] /* List of languages with which the event/place is friendly,
      /* any other stats we are saving and want to show 
        }
      ]*/
    });
  }

  render() {
    return <div ref="map" style={{ height: "100%", width: "100%" }} />;
  }
}

export default MapContainer;
