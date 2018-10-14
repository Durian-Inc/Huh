import React, { Component } from "react";
import GoogleMapsLoader from "google-maps";
import axios from "axios";

class MapContainer extends Component {
  componentDidMount() {
    let el = this.refs.map;
    let options = {
      center: { lat: 38.627, lng: -90.1994 },
      zoom: 15,
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true
    };
    GoogleMapsLoader.VERSION = "weekly";
    GoogleMapsLoader.KEY = "AIzaSyCAgU40OXQVFZ5azzF13WtS20OM8pGFCH4";
    GoogleMapsLoader.load(function(google) {
      var map = new google.maps.Map(el, options);
      var styledMapType = new google.maps.StyledMapType(
        [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#8ec3b9"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1a3646"
              }
            ]
          },
          {
            featureType: "administrative.country",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#4b6878"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#64779e"
              }
            ]
          },
          {
            featureType: "administrative.province",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#4b6878"
              }
            ]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#334e87"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
              {
                color: "#023e58"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#283d6a"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#6f9ba5"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#023e58"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#3C7680"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#304a7d"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#98a5be"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#2c6675"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#255763"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#b0d5ce"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#023e58"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#98a5be"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1d2c4d"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#283d6a"
              }
            ]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
              {
                color: "#3a4762"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#0e1626"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#4e6d70"
              }
            ]
          }
        ],
        { name: "Styled Map" }
      );
      map.mapTypes.set("styled_map", styledMapType);
      map.setMapTypeId("styled_map");

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

            map.panTo(pos);
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

      axios.get("http://localhost:5000/api/query").then(response => {
        let locations = response.data;
        locations.forEach(loc => {
          var marker = new google.maps.Marker({
            position: {
              lat: loc.lat,
              lng: loc.lng
            },
            map: map
          });

          marker.addListener("click", function() {
            window.updateInfo(
              loc.name,
              loc.type,
              null,
              null,
              loc.address,
              loc.desc
            );
          });
        });
      });
    });
  }

  render() {
    return (
      <div
        ref="map"
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          zIndex: 0
        }}
      />
    );
  }
}

export default MapContainer;
