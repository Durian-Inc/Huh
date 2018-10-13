import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import { MapContainer } from "./components";

const AppWrap = styled.div`
  height: 100%;
  width: 100%;
`;

class App extends Component {
  render() {
    return (
      <AppWrap>
        <MapContainer />
      </AppWrap>
    );
  }
}

export default App;
