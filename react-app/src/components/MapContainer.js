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
      zoom: 8
    };
    GoogleMapsLoader.VERSION = "3.34";
    GoogleMapsLoader.KEY = process.env.__GAPI_KEY__;
    console.log(process.env.__GAPI_KEY__);
    GoogleMapsLoader.load(function(google) {
      new google.maps.Map(el, options);
    });
  }

  render() {
    return <div ref="map" style={{ height: "100%", width: "100%" }} />;
  }
}

export default MapContainer;
