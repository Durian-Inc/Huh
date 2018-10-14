import React, { Component } from "react";
import styled from "styled-components";
import SearchbarContainer from "./SearchbarContainer";

const SearchWrapper = styled.div({
  top: "30px",
  left: "30px",
  position: "absolute",
  background: "white",
  borderRadius: "40px",
  boxShadow: "0 4px 20px rgba(255, 7, 245, 0.5)",
  height: "50px",
  width: "300px",
  zIndex: 5
});

class Search extends Component {
  render() {
    return (
      <SearchWrapper>
        <SearchbarContainer />
      </SearchWrapper>
    );
  }
}

export default Search;
