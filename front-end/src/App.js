import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Info from "./components/Info";
import About from "./components/About";
import Gallery from "./components/Gallery";
import { CSSTransition } from "react-transition-group";

class App extends Component {
  static defaultProps = {
    pageToRender: "video"
  };

  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    this.info = {};
    // Set the state directly. Use props if necessary.
    this.state = {
      showInfo: false,
      showInfoMenu: true
    };

    this.onClickInfoIcon = this.onClickInfoIcon.bind(this);
    this.setInfo = this.setInfo.bind(this);
    this.changedRoute = this.changedRoute.bind(this);
  }

  setInfo(title, description) {
    this.setState({
      showInfo: false
    });
    this.info = {
      title,
      description
    };
    this.forceUpdate();
  }

  onClickInfoIcon() {
    this.setState({
      showInfo: !this.state.showInfo
    });
  }
  
  changedRoute(pathname) {
    this.setState({
      showInfoMenu: pathname.includes("/game") || pathname === "/",
      isGalleryPage: pathname === "/gallery",
      isAboutPage: pathname === '/about',
      showInfo: false
    });
  }

  render() {
    if (this.setInfo) {
      
      return (
        <div className="App">
          <Router>
            <Menu onClickInfoIcon={this.onClickInfoIcon} 
                  isInfoOn={this.state.showInfo} 
                  isGalleryPage={this.state.isGalleryPage}
                  isAboutPage={this.state.isAboutPage}
                  showMenu={this.state.showInfoMenu}
                  changedRoute={this.changedRoute}/>
            <CSSTransition
              in={this.state.showInfo}
              timeout={300}
              classNames="infoContainer"
              unmountOnExit
            >
              <Info info={this.info} />
            </CSSTransition>
            <div className="mainWindow">
              <Route
                exact
                path="/"
                onChange={this.changedRoute}
                render={props => <Home {...props} setInfo={this.setInfo} />}
              />
              <Route
                onChange={this.changedRoute}
                path="/gallery"
                render={props => <Gallery {...props} changedRoute={this.changedRoute} />}
              />
              <Route
                onChange={this.changedRoute}
                path="/game/:id"
                render={props => <Game {...props} setInfo={this.setInfo} />}
              />
              <Route
                exact
                path="/about"
                onChange={this.changedRoute}
                render={props => <About {...props} setInfo={this.setInfo} />}
              />
            </div>
          </Router>
        </div>
      );
    }
  }
}

export default App;
