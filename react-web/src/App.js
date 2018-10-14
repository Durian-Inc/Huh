import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import {
  MapContainer,
  CheckboxContainer,
  SearchbarContainer,
  FilterBox
} from "./components";

const AppWrap = styled.div`
  height: 100%;
  width: 100%;
`;

class App extends Component {
  render() {
    return (
      <AppWrap>
        <FilterBox>
          <CheckboxContainer />
        </FilterBox>
        <SearchbarContainer />
        <MapContainer />
      </AppWrap>
    );
  }
}

export default App;