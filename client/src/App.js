import React, { Component } from 'react';
import './App.css';
import Axios from '../node_modules/axios';





class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {helloworld: "No fukt"};
  }
  

  render() {
    let fetchedServerData=this.serverData()
    setInterval(()=>{
    fetchedServerData.then(resp=>{this.setState({helloworld:resp})})
    }, 2000)
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <label>{this.state.helloworld}</label>
      </div>
    );
  
  
  }
  serverData = ()=>{
     return Axios.get("http://192.168.0.76:3200/").then(resp=>{
      
      return resp.data;
    }
      
    )
  }

}

export default App;
