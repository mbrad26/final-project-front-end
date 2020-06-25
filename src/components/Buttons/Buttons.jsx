import React, { Component } from 'react';
import './Buttons.css';

class Buttons extends Component {
  render() {
    return (
      <div className='buttons-container'>
        <button className="previous" onClick={this.props.handlePrevious}>Previous</button>
        <button className="next" onClick={this.props.handleNext}>Next</button>
      </div>
    )
  }
}

export default Buttons;
