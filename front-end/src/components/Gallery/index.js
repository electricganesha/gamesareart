import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.scss";

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
        videos: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/api/games")
      .then(response => response.json())
      .then(videos => {
        this.setState({
          videos
        });
      });
  }

  changedRoute(pathname) {
    this.props.changedRoute(pathname);
  }

  render() {

    const gallery = [];
    let counter = 0;

    if(this.state.videos){
        this.state.videos.data.forEach(video => {
            counter++;
            const videoId = video.attributes['video-link'].split("=")[1];
            const linkToGame = "/game/"+video['id'];
            const imageLink = "https://img.youtube.com/vi/"+videoId+"/0.jpg";
            gallery.push(<div className="galleryItem" key={gallery.length}><Link to={linkToGame}><img onClick={this.changedRoute.bind(this, linkToGame)} alt={video.attributes['name']} src={imageLink}></img></Link></div>);
        });
        
    }

    return (
      <div className="gallery">
        {gallery}
      </div>
    );
  }
}

export default Gallery;
