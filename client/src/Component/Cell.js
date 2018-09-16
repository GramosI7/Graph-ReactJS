import React, { Component } from 'react';

import "../style/Cell.css"

export class Cell extends Component {
  render() {

    if(this.props.inModified && this.props.whosModified === this.props.index) {
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
          <td data-number={Math.floor(this.props.number)} onClick={this.props.toModified} className={this.props.index}>
            {Math.floor(this.props.number)}
          </td>
        )}
      }
    }

export default Cell
