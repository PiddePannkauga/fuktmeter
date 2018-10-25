import React, { PureComponent } from 'react';
import './App.css';
import Axios from '../node_modules/axios';





class App extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {tempHum: "No fukt"};
  }

  componentDidMount(){
    // this.serverData().then(resp=>{this.setState({tempHum:resp})})
    this.serverDataLoop();
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   return nextProps.tempHum !== this.props.tempHum;

  // }

  render() {

    return (
      <div className="App">
        <header className="App-header">

        </header>
        <label>{this.state.tempHum}</label>
      </div>
    );
  
  }

  serverDataLoop(){
    setInterval(()=>{
    this.serverData().then(resp=>{this.setState({tempHum:resp})})},5000)
  }

  serverData = () =>{
      return Axios.get("http://192.168.0.76:3200/").then(resp=>{
      console.log(resp.data)
      return resp.data;
    }
      
    )
  }

}

export default App;
