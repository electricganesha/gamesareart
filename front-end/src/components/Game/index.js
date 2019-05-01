import React, { Component } from "react";
import VideoWrapper from "../Video/VideoWrapper";
import styles from "./styles.scss";

class Game extends Component {

  render() {
    const gameId = this.props.match.params.id;
    console.log("IN GAME");
    console.log(this.props);
    
    return (
      <div>
        <VideoWrapper gameId={gameId} setInfo={this.props.setInfo}/>
      </div>
    );
    
  }
}

export default Game;
