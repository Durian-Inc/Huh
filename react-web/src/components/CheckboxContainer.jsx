import React from "react";
import "./CheckboxContainer.css";

class CheckBox extends React.Component {
  render() {
    return (
      <label className="container">
        <input
          type="checkbox"
          id={this.props.id}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <span className="checkmark" />
      </label>
    );
  }
}

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { optionsChecked: [] };
  }

  changeEvent(event) {
    let checkedArray = this.state.optionsChecked;
    let selectedValue = event.target.value;

    if (event.target.checked === true) {
      checkedArray.push(selectedValue);
      this.setState({
        optionsChecked: checkedArray
      });
    } else {
      let valueIndex = checkedArray.indexOf(selectedValue);
      checkedArray.splice(valueIndex, 1);

      this.setState({
        optionsChecked: checkedArray
      });
    }
  }

  render() {
    let checkBoxArray = ["Events", "Businesses", "Hiring"];

    let outputCheckboxes = checkBoxArray.map(function(string, i) {
      return (
        <div style={{ padding: "8px 0" }}>
          <span>
            <label htmlFor={"string_" + i}>{string}</label>
          </span>
          <CheckBox
            value={string}
            id={"string_" + i}
            onChange={this.changeEvent.bind(this)}
          />
        </div>
      );
    }, this);

    return (
      <div>
        {" "}
        <h4
          style={{ textAlign: "center", textTransform: "uppercase", margin: 0 }}
        >
          Filter
        </h4>
        <div>{outputCheckboxes}</div>
      </div>
    );
  }
}

export default Controls;
