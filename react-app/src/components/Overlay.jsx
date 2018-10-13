import React from 'react';
import PropTypes from 'prop-types';

function CustomPopover({ className, style }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        position: 'absolute',
        backgroundColor: '#EEE',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
        border: '1px solid #CCC',
        borderRadius: 3,
        marginLeft: -5,
        marginTop: 5,
        padding: 10
      }}
    >
      <strong>Holy guacamole!</strong> Check this info.
    </div>
  );
}

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleToggle = this.handleToggle.bind(this);

    this.state = {
      show: true
    };
  }

  handleToggle() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
        <Overlay
          show={this.state.show}
          //onHide={() => this.setState({ show: false })}
          placement="left"
          container={this}
          target={() => ReactDOM.findDOMNode(this.target)}
        >
          <CustomPopover />
        </Overlay>
      </div>
    );
  }
}

export default Overlay;
