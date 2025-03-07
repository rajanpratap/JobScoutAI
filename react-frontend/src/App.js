import React, { Component } from 'react';
import logo from './JobScoutAI_Logo.jpg';
import HomePage from './homePage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to JobScoutAI</h2>
        </div>
        <div>
            <HomePage/>
        </div>
      </div>
    );
  }
}

export default App;
