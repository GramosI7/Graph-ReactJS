import React, { Component } from 'react'
import Cell from './Cell';
import "../style/Table.css"

class Table extends Component {

  render() {
    return (
      <div className="table">
          <table>
            <tbody>
              <tr>
                <td>CAC40</td>
                {this.props.data[0].map((element, index) => {
                  return  <Cell
                            keyPress={this.props.keyPress} 
                            valueNumber={this.props.valueNumber}
                            onChangeValue={this.props.onChangeValue} 
                            inModified={this.props.inModified} 
                            whosModified={this.props.whosModified}
                            toModified={this.props.toModified} 
                            key={index} 
                            index={index.toString()} 
                            number={element.y} 
                          />
                })}
              </tr>
              <tr>
                <td>NASQ</td>
                {this.props.data[1].map((element, index) => {
                  const indexMore = index+20;
                  return<Cell
                            keyPress={this.props.keyPress} 
                            valueNumber={this.props.valueNumber}
                            onChangeValue={this.props.onChangeValue} 
                            inModified={this.props.inModified} 
                            whosModified={this.props.whosModified}
                            toModified={this.props.toModified} 
                            key={index} 
                            index={indexMore.toString()} 
                            number={element.y} 
                          />
                })}
              </tr>
            </tbody>
          </table>
        </div>
    )
  }
}

export default Table
