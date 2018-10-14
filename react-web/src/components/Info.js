import React, { Component } from "react";
import styled from "styled-components";

const InfoWrapper = styled.div`
  bottom: 30px;
  left: 30px;
  position: absolute;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(255, 7, 245, 0.5);
  height: 300px;
  width: 250px;
  padding: 15px;
  z-index: 5;

  @media (max-width: 630px) {
    display: none;
  }

  @media (max-height: 500px) {
    display: none;
  }
`;

class Info extends Component {
  openModal = () => {
    window.openModal();
  };
  render() {
    return (
      <div>
        <InfoWrapper>
          <h3>
            <span id="name">Select a marker!</span>
          </h3>
          <h4>
            Type of business:&nbsp;
            <span id="type" />
          </h4>
          <p>
            Privacy level:&nbsp;
            <span id="prating">0.0/5.0</span>
          </p>
          <p>
            Language acceptance:&nbsp;
            <span id="lrating">0.0/5.0</span>
          </p>
          <p>
            Address:&nbsp;
            <span id="location" />
          </p>
          <p>
            Description:&nbsp;
            <span id="desc" />
          </p>
          <button onClick={this.openModal}>Add or Edit</button>
        </InfoWrapper>
      </div>
    );
  }
}

export default Info;
