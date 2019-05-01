import React, { Component } from "react";
import styles from "./styles.scss";

class Info extends Component {
  render() {
    return (
      <div className="infoContainer">
        <h3>{this.props.info.title}</h3>
        <p>{this.props.info.description}</p>
      </div>
    );
  }
}

export default Info;
