import React, { Component } from "react";
import VideoPlayer from "../VideoPlayer";
import styles from "./styles.scss";

class VideoWrapper extends Component {
  render() {
    const gameId = this.props.gameId;
    console.log(this.props);
    return (
      <div
        className="videoWrapper"
        id="videoWrapper"
        onClick={this._pauseVideo}
      >
        <VideoPlayer gameId={gameId} setInfo={this.props.setInfo}/>
      </div>
    );
  }
}

export default VideoWrapper;
