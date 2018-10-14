import styled from 'styled-components';
import Controls from './CheckboxContainer';
const FilterBox = styled.div({
  top: '30px',
  paddingTop: '5px',
  paddingLeft: '5px',
  right: '30px',
  position: 'absolute',
  borderRadius: '3px',
  boxShadow: '1px 1px 1px 1px #ccc',
  height: '80px',
  width: '150px',
  zIndex: 5, 
  background: 'white'
});

export default FilterBox;
