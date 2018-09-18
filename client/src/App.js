import React, { Component } from 'react';
import './style/App.css';
import Graph from "./Component/Graph"
import Table from './Component/Table';

import { connect } from 'react-redux';
import { requestData } from "./actions/requestAction";


class App extends Component {
  state = {
    data: [],
    secondsElapsed: 0,
    inModified: false,
    whosModified: null,
    intervalId: () => {},
    valueNumber: "",
    test:""
  }

  componentDidMount() {
    this.props.requestData();
    let intervalId = setInterval(this.managementData, 1000);
    this.setState({ intervalId: intervalId })
  }

  managementData = () => {
    const {secondsElapsed} = this.state;
    const {dataCAC40, dataNASDAQ} = this.props.data;
    this.setState({secondsElapsed: secondsElapsed + 1});
    this.setState({data :
    [dataCAC40.slice(secondsElapsed, secondsElapsed+20), 
    dataNASDAQ.slice(secondsElapsed, secondsElapsed+20)]})
  }

  toModified = (e) => {
    this.setState({inModified: true, whosModified: e.target.dataset.index, valueNumber: e.target.dataset.number})
    clearInterval(this.state.intervalId)
  }

  onChangeValue = (e) => {
    const {whosModified, valueNumber, data} = this.state;
    this.setState({valueNumber: e.target.value})
    console.log(data)
      if(parseInt(whosModified) < 20) {
        let copy = Object.assign([], data[0]);
        copy[whosModified].y = valueNumber;
        console.log(copy)
        let newData = JSON.parse(JSON.stringify(this.state.data));
        newData[0][whosModified].y = valueNumber;
    
        this.setState({ data: newData });

        // let copy1 = copy[0][whosModified].y = valueNumber;
        // this.setState({data: copy})
        // console.log(copy)
        // this.setState({data: [...data, data[0][whosModified].y = valueNumber]})
      } else {
        let newsNumberTwo = data[1][whosModified-20].y = valueNumber;
      }
  }

  keyPress = (e) => {
    if (e.key==="Enter") {
      let intervalId = setInterval(this.managementData, 1000);
      this.setState({ inModified:false, intervalId: intervalId })
    }
  }

  render() {
    return (
      <div className="App">
       <h1>One2Team</h1>
       {this.state.data.length > 1 && 
       (<div>
            <Graph data={this.state.data} />
            <Table
              keyPress={this.keyPress} 
              valueNumber={this.state.valueNumber}
              onChangeValue={this.onChangeValue}
              whosModified={this.state.whosModified} 
              inModified={this.state.inModified} 
              toModified={this.toModified} 
              data={this.state.data} 
            />
        </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { requestData })(App);

