// PlantButton.js
import React from 'react';
import PropTypes from 'prop-types';

class PlantButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
  }

  buttonSelected = () => {
    this.setState(
      (prevState) => ({
        selected: !prevState.selected,
      }),
      () => {
        this.props.onClick(this.props.children, this.state.selected);

        // Check if the button is selected, and if it is, deselect others in the same group
        if (this.state.selected) {
          this.props.deselectOtherButtonsInGroup(this.props.group);
        }
      }
    );
  };

  render() {
    const { selected } = this.state;
    const buttonStyle = {
      backgroundColor: selected ? '#006400' : '#008000',
      color: '#ffffff',
    };

    return (
      <button
        style={buttonStyle}
        onClick={this.buttonSelected}
        disabled={this.props.disabled}
        className={`plantButton ${this.props.group}`}
      >
        {this.props.children}
      </button>
    );
  }
};

PlantButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  deselectOtherButtonsInGroup: PropTypes.func,
  group: PropTypes.string,
};

export default PlantButton;
