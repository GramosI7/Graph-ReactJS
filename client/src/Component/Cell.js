import React, { Component } from 'react';

import "../style/Cell.css"

export class Cell extends Component {
  render() {
    if((this.props.inModified) && (this.props.whosModified === this.props.index)) {
      return (
        <td>
          <input
          onKeyPress={this.props.keyPress} 
          onChange={this.props.onChangeValue} 
          className="input__Cell" type="number" 
          value={this.props.valueNumber}
          />
        </td>
      )} else {
        return (
          <td data-number={Math.round(this.props.number * 100)/100} 
          onClick={this.props.toModified} 
          data-index={this.props.index}
          >
            {Math.round(this.props.number * 100)/100}
          </td>
        )}
      }
    }

export default Cell
