import React, { Component } from "react";
import styled from "styled-components";

const InfoWrapper = styled.div({
  bottom: "30px",
  left: "30px",
  position: "absolute",
  background: "white",
  borderRadius: "20px",
  boxShadow: "1px 1px 1px 1px #ccc",
  height: "300px",
  width: "200px",
  padding: "15px",
  zIndex: 5
});

class Info extends Component {
  render() {
    return (
      <InfoWrapper>
        <h3 id="name">bees</h3>
        <h4 id="type">bees</h4>
        <p id="prating">0.0/5.0</p>
        <p id="lrating">0.0/5.0</p>
        <p id="location">bees</p>
        <p id="desc">lots of bees</p>
      </InfoWrapper>
    );
  }
}

export default Info;
