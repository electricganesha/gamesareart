import React, { Component } from "react";
import VideoWrapper from "../Video/VideoWrapper";
import styles from "./styles.scss";

class Game extends Component {
  render() {
    const gameId = this.props.match.params.id;
    return (
      <div>
        <VideoWrapper gameId={gameId} />
      </div>
    );
  }
}

export default Game;
