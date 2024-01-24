import React from 'react';
import PropTypes from 'prop-types';

class PlantButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
    this.buttonRef = React.createRef();
  }

  handleButtonClick = () => {
    // Pass the size to the onButtonClick function
    this.props.onButtonClick(this.props.size);
  };

  buttonSelected = (select = true) => {
    this.setState(
      {
        selected: select,
      },
      () => {
        // Check if resetButtonState is defined before calling it
        if (this.props.resetButtonState && typeof this.props.resetButtonState === 'function') {
          this.props.resetButtonState();
        }

        console.log(this.state.selected ? 'Button selected!' : 'Button deselected!');
        // Callback to parent component
        this.props.onClick(this.props.size, this.state.selected);
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
        ref={this.buttonRef}
        onDoubleClick={this.handleButtonClick}
        style={buttonStyle}
        onClick={() => this.buttonSelected(!this.state.selected)}
        disabled={this.props.disabled}
        className={`plantButton ${this.props.group} ${selected ? 'selected' : ''}`}
      >
        {/* You can customize the button appearance here */}
        <div className={`plantButton-inner size-${this.props.size}`} style={{ backgroundColor: this.props.color }}></div>
      </button>
    );
  }
}

PlantButton.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  resetButtonState: PropTypes.func,
  group: PropTypes.string,
};

export default PlantButton;
