import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.scss";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import { CSSTransition } from "react-transition-group";

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: null,
      currentPage: 1,
      prevPage: null,
      nextPage: null,
      showGallery: false
    };

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  componentDidMount() {
    this.fetchGames();
  }

  fetchGames() {
    fetch("http://localhost:3001/api/games?page=" + this.state.currentPage)
      .then(response => response.json())
      .then(videos => {
        console.log(videos);
        this.setState({
          videos: videos.docs,
          nextPage: videos.nextPage,
          prevPage: videos.prevPage,
          showGallery: true
        });
      });
      this.forceUpdate();
      console.log(this.state);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  changedRoute(pathname) {
    this.props.changedRoute(pathname);
  }

  nextPage = () => {
    if (this.state.nextPage) {
      const nextPage = this.state.nextPage;
      this.setState({
        currentPage: nextPage,
        showGallery: false
      });
      this.fetchGames();
    }
  };

  prevPage = () => {
    if (this.state.prevPage) {
      const prevPage = this.state.prevPage;
      this.setState({
        currentPage: prevPage,
        showGallery: false
      });
      this.fetchGames();
    }
  };

  render() {
    const gallery = [];
    let counter = 0;

    if (this.state.videos) {
      this.state.videos.forEach(video => {
        counter++;
        const videoId = video.video_link.split("=")[1];
        const linkToGame = "/game/" + video["id"];
        const imageLink = "https://img.youtube.com/vi/" + videoId + "/0.jpg";
        gallery.push(
          <div className="galleryItem" key={gallery.length}>
            <Link to={linkToGame}>
              <img
                onClick={this.changedRoute.bind(this, linkToGame)}
                alt={video.name}
                src={imageLink}
              />
            </Link>
          </div>
        );
      });
    }

    return (
      <CSSTransition
        in={this.state.showGallery}
        timeout={500}
        classNames="gallery"
        unmountOnExit
      >
        <ReactScrollWheelHandler
          upHandler={this.prevPage}
          downHandler={this.nextPage}
          timeout={500}
        >
          <div className="gallery">
            {gallery}
          </div>
        </ReactScrollWheelHandler>
      </CSSTransition>
    );
  }
}

export default Gallery;
