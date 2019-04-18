import React, { Component } from 'react';
import styles from './styles.scss';

class FullScreenVideoWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/games')
      .then(response => response.json())
      .then(videos => this.setState({ videos }));
  }

  

  render() {

    let baseVideo = null;

    if(this.state.videos){
      baseVideo = this.state.videos.data[0].attributes["video-link"];
    }
    
    return (
      <div className="videoWrapper">
        <iframe title="video" className="video" src={baseVideo} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" autoPlay frameBorder="0" allowFullScreen></iframe>
      </div>
    );
  }
}

export default FullScreenVideoWrapper;