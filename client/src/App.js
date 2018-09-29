import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from '../node_modules/axios';





class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {helloworld: "Test"};
  }
  

  render() {
    let fetchedServerData=this.serverData()
    fetchedServerData.then(resp=>{this.setState({helloworld:resp})})
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <label>{this.state.helloworld}</label>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
         
          
        </p>
      </div>
    );
  
  
  }
  serverData = ()=>{
     return Axios.get("http://localhost:3000/").then(resp=>{
      
      return resp.data;
    }
      
    )
  }

}

export default App;
