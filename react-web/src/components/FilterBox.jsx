import styled from "styled-components";
const FilterBox = styled.div`
  top: 30px;
  right: 30px;
  position: absolute;
  border-radius: 20px;
  box-shadow: 0px 4px 20px rgba(255, 7, 245, 0.5);
  padding: 15px;
  width: 150px;
  z-index: 5;
  background: white;

  @media (max-width: 630px) {
    display: none;
  }

  @media (max-height: 500px) {
    display: none;
  }
`;

export default FilterBox;
