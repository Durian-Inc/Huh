import React, { Component } from "react";
import GoogleMapsLoader from "google-maps";
//import styled from "styled-components";

/*const Map = styled.div`
  height: 100%;
  width: 100%;
`;
*/
class SearchbarContainer extends Component {

  render() {
    return <form>
      <input ref="searchbar" placeholder="Search..." style={{ height: "1.5rem", width: "20rem" }} />
      <button type="submit">Search</button>
      </form>
  }
}

export default SearchbarContainer;
