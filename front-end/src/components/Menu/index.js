import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import styles from "./styles.scss";
import Gallery from "../Gallery";
import Game from "../Game";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const pathname = window.location.pathname;
    const showMenu = pathname === "/game" || pathname === "/home";
    return (
      <div>
        <div className="leftMenu">
          <Link to="/gallery" className="galleryIcon" />
          {showMenu && <Link to="/info" className="infoIcon" />}
        </div>
        <div className="rightMenu">
          <Link to='/'><p>Games are art</p></Link>
        </div>
      </div>
    );
  }
}

export default Menu;
