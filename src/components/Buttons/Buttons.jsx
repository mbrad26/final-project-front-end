import React, { Component } from 'react';
import './Buttons.css';

class Buttons extends Component {
  render() {
    return (
      <div className='buttons-container'>
        <button className="previous">Previous</button>
        <button className="next">Next</button>
      </div>
    )
  }
}

export default Buttons;
