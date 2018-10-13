import React, { Component } from "react";
import Autocomplete from 'react-autocomplete'
//import GoogleMapsLoader from "google-maps";
//import styled from "styled-components";

/*const Map = styled.div`
  height: 100%;
  width: 100%;
`;
*/
class SearchbarContainer extends Component {

  render() {
    return <form>
      <Autocomplete
        getItemValue={(item) => item.label}
        items={[
          { label: 'apple' },
          { label: 'banana' },
          { label: 'pear' }
        ]}
        renderItem={(item, isHighlighted) =>
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.label}
          </div>
        }
        value=''
        onChange={(e) => value = e.target.value}
        onSelect={(val) => value = val}
      />
      <input ref="searchbar" placeholder="Search..." style={{ height: "1.5rem", width: "20rem" }} />
      <button type="submit">Search</button>
      </form>
  }
}

export default SearchbarContainer;