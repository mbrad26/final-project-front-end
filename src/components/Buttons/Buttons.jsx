import React, { Component } from 'react';
import './Buttons.css';

const Buttons = props => {
  return (
    <div className='buttons-container'>
      <button className="previous" onClick={props.handlePrevious}>Previous</button>
      <button className="next" onClick={props.handleNext}>Next</button>
    </div>
  );
}

export default Buttons;
