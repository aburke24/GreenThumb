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

  handleDoubleClick = () => {
    // Check if setButtonContent is defined before calling it
    if (this.props.setButtonContent) {
      this.props.setButtonContent('Plant 2');
    }
  };

  buttonSelected = (select = true) => {
    // Call resetPlantButtons before handling selection logic
    this.props.resetPlantButtons();

    this.setState(
      {
        selected: select,
      },
      () => {
        // Log a message when the button is selected or deselected
        console.log(this.state.selected ? 'Button selected!' : 'Button deselected!');

        this.props.onClick(this.props.children, this.state.selected);

        // Deselect others in the same group
        this.props.deselectOtherButtonsInGroup(this.props.group, this);
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
        onDoubleClick={this.handleDoubleClick}
        style={buttonStyle}
        onClick={() => this.buttonSelected(!this.state.selected)} // Toggle selection
        disabled={this.props.disabled}
        className={`plantButton ${this.props.group}`}
      >
        {this.props.children}
      </button>
    );
  }
}

PlantButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  deselectOtherButtonsInGroup: PropTypes.func,
  group: PropTypes.string,
  setButtonContent: PropTypes.func, // Add setButtonContent to propTypes
  resetPlantButtons: PropTypes.func, // Add resetPlantButtons to propTypes
};

export default PlantButton;
