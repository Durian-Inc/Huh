import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import SlidingPane from "react-sliding-pane";
import {
  MapContainer,
  CheckboxContainer,
  SearchbarContainer
} from "./components";

const AppWrap = styled.div`
  height: 100%;
  width: 100%;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      isPaneOpen: false
    };
    this.openPane = this.openPane.bind(this);
  }

  openPane() {
    this.setState({
      isPaneOpen: true
    });
  }

  render() {
    return (
      <AppWrap>
        <CheckboxContainer />
        <SearchbarContainer />
        <SlidingPane
          isOpen={this.state.isPaneOpen}
          width="300px"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            this.setState({ isPaneOpen: false });
          }}
        >
          <div>And I am pane content. BTW, what rocks?</div>
        </SlidingPane>
        <MapContainer pane={this.openPane} />
      </AppWrap>
    );
  }
}

export default App;
