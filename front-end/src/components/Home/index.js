import React, { Component } from "react";
import VideoWrapper from "../Video/VideoWrapper";
import styles from "./styles.scss";
const dotenv = require('dotenv');

class Home extends Component {
  render() {
    return (
      <div>
        <VideoWrapper gameId={process.env.DEFAULT_GAME_ID} setInfo={this.props.setInfo} />
      </div>
    );
  }
}

export default Home;
