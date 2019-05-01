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

    this.changedRoute = this.changedRoute.bind(this);
  }

  changedRoute(pathname) {
    this.props.changedRoute(pathname);
  }

  render() {
    const infoIconActive = this.props.isInfoOn ? 'infoIcon--active' : 'infoIcon';
    const isGalleryPage = this.props.isGalleryPage ? 'galleryIcon--active' : 'galleryIcon';
    const isAboutPage = this.props.isAboutPage ? 'questionMarkIcon--active' : 'questionMarkIcon';
    return (
      <div>
        <div className="leftMenu">
          <Link to="/gallery"><div onClick={this.changedRoute.bind(this, '/gallery')} className={isGalleryPage}></div></Link>
          <Link to="/about"><div onClick={this.changedRoute.bind(this, '/about')} className={isAboutPage}></div></Link>
          {this.props.showMenu && <div onClick={this.props.onClickInfoIcon} className={infoIconActive} />}
        </div>
        <div className="rightMenu">
          <Link to='/'><p onClick={this.changedRoute.bind(this, '/')}>Games are art</p></Link>
        </div>
      </div>
    );
  }
}

export default Menu;
