import React, { Component } from "react";
import VideoWrapper from "../Video/VideoWrapper";
import styles from "./styles.scss";
const dotenv = require('dotenv');

class About extends Component {
  render() {
    return (
      <div className="about">
        <p>
            Gamesareart is a Lisbon-based curated video gallery that showcases videogames with artistic characteristics. 
            <br/><br/>
            This website was conceptualised by Ricardo Rodrigues, designed by <a href="https://www.angharadhengyu.xyz">Angharad Hengyu Owen</a> and developed by <a href="https://www.christianmarques.info">Christian Marques</a>. The gallery is curated by Ricardo Rodrigues, Christian Marques, Pedro Motta and Pedro Cardial.
            <br/><br/>
            Contact us at <a href="mailto:info@gamesareart.com">info@gamesareart.com</a>
        </p>
      </div>
    );
  }
}

export default About;
