import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";

class App extends Component {
  static defaultProps = {
    pageToRender: "video"
  };

  render() {
    return (
      <div className="App">
          <Router>
              <Menu />
            <div className="mainWindow">
              <Route exact path="/" component={Home} />
              <Route path="/gallery/" component={Gallery} />
              <Route path="/game/:id" component={Game} />
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
