import React, { Component } from 'react';
import './style/App.css';
import axios from "axios";
import Graph from "./Component/Graph"
import Table from './Component/Table';

class App extends Component {
  state = {
    dataFullOne: [],
    dataFullTwo: [],
    data: [],
    secondsElapsed: 0,
    inModified: false,
    whosModified: null,
    intervalId: () => {},
    valueNumber: "",
  }

  componentDidMount() {
    let intervalId = setInterval(this.testfunction, 1000);
    this.setState({ intervalId: intervalId })
    this.getDataFromServer()
  }

  getDataFromServer = () => {
    axios.get("http://127.0.0.1:8000/")
      .then(response => {
        // console.log(response.data)
        let dataOne = [];
        let dataTwo = [];
        response.data.map((element, index) => {
          dataOne.push(Object.assign({x: index, y:element.stocks.CAC40}))
          dataTwo.push(Object.assign({x: index, y:element.stocks.NASDAQ}))
        })
        this.setState({
          dataFullOne : dataOne.slice(0,1000),
          dataFullTwo : dataTwo.slice(0,1000) 
        })
        })
      .catch(error => console.log(error))
  }

  testfunction = () => {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    this.setState({data : 
    [this.state.dataFullOne.slice(this.state.secondsElapsed, this.state.secondsElapsed+20), 
    this.state.dataFullTwo.slice(this.state.secondsElapsed, this.state.secondsElapsed+20)]})
  }

  toModified = (e) => {
    this.setState({inModified: true, whosModified: e.target.className, valueNumber: e.target.dataset.number})
    clearInterval(this.state.intervalId)
  }

  onChangeValue = (e) => {
    const {whosModified, valueNumber, data} = this.state;
    this.setState({valueNumber: e.target.value})
      if(parseInt(whosModified) < 20) {
        console.log("okkk")
        let newsNumber = data[0][whosModified].y = valueNumber;
        // console.log(newsNumber);
        // this.setState({data : [...data, data[0].splice([whosModified].y, 1, parseInt(valueNumber))]})
      } else {
        let newsNumberTwo = data[1][whosModified-20].y = valueNumber;
      }
  }

  keyPress = (e) => {
    if (e.key==="Enter") {
      let intervalId = setInterval(this.testfunction, 1000);
      this.setState({ inModified:false, intervalId: intervalId })
    }
  }

  render() {
    const renderGraph = () => {
      if(this.state.data.length > 1) {
        return (
          <div>
            <Graph data={this.state.data} />
            <Table
            keyPress={this.keyPress} 
            valueNumber={this.state.valueNumber}
            onChangeValue={this.onChangeValue}
            whosModified={this.state.whosModified} 
            inModified={this.state.inModified} 
            toModified={this.toModified} 
            data={this.state.data} />
          </div>
        ) 
      }
    }

    return (
      <div className="App">
       <h1>One2Team</h1>
        {renderGraph()}
      </div>
    );
  }
}

export default App;
