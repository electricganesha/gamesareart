import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FullScreenVideoWrapper from './components/FullScreenVideoWrapper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FullScreenVideoWrapper/>
      </div>
    );
  }
}

export default App;
