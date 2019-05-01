import React, { Component } from "react";
import ReactPlayer from "react-player";
import VideoControls from "../VideoControls";
import PropTypes from 'prop-types';
import styles from "./styles.scss";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this._nextVideo = this._nextVideo.bind(this);
    this._prevVideo = this._prevVideo.bind(this);
    this._pauseVideo = this._pauseVideo.bind(this);
    this._onSeek = this._onSeek.bind(this);
    this._onProgress = this._onProgress.bind(this);
    this._onDuration = this._onDuration.bind(this);
    this._onSeekMouseDown = this._onSeekMouseDown.bind(this);
    this._onSeekChange = this._onSeekChange.bind(this);
    this._onSeekMouseUp = this._onSeekMouseUp.bind(this);
    this._onEnded = this._onEnded.bind(this);

    this.state = {
      currentGameId: null,
      volume: 100,
      muted: true,
      playing: true,
      currentVideo: null,
      played: 0,
      loaded: 0,
      pip: false,
      ref: null
    };
  }

  static propTypes = {
    setInfo: PropTypes.func.isRequired
  };

  ref = player => {
    this.player = player;
    this.setState({ref: player});
  };

  componentDidMount() {
    if(this.props.gameId) {
      fetch("http://localhost:3001/api/games/"+this.props.gameId)
      .then(response => response.json())
      .then(video => {
        this.props.setInfo(
        video.data.attributes["name"].toString(), 
        video.data.attributes["description"].toString()
        );
        this.setState({
            currentGameId: this.props.gameId,
            currentVideo: video.data.attributes[
            "video-link"
          ].toString()
        });
      });
    }
  }

  _pauseVideo() {
    this.setState({
      playing: !this.state.playing
    });
  }

  _onSeek(seconds) {
    //console.log(seconds);
  }

  _onProgress(state) {
    this.setState({ played: state.played });
  }

  _onDuration = duration => {
    // console.log("onDuration", duration);
    // this.setState({ duration });
  };

  _onSeekMouseDown = e => {
    this.setState({ seeking: true });
  };
  _onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) });
  };
  _onSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  _onEnded() {
    this._nextVideo();
  };

  _prevVideo(event,ref) {
    if(event)
        event.preventDefault();
    fetch("http://localhost:3001/api/games/prev/"+this.state.currentGameId)
      .then(response => response.json())
      .then(video => {
        this.props.setInfo(
          video.data.attributes["name"].toString(), 
          video.data.attributes["description"].toString()
        );
        if(video.data) {
        this.setState({
            currentGameId: video.data.id,
            volume: 100,
            muted: false,
            playing: true,
            played: 0,
            loaded: 0,
            pip: false,
          currentVideo: video.data.attributes[
            "video-link"
          ].toString()
        });
      } else {
        this.setState({
          currentGameId: process.env.DEFAULT_GAME_ID,
          volume: 100,
          muted: false,
          playing: true,
          played: 0,
          loaded: 0,
          pip: false,
          currentVideo: process.env.DEFAULT_GAME_LINK
      });
      }
      });
      
    this.state.ref.seekTo(0,'seconds');
    this.forceUpdate();
  }

  _nextVideo(event,ref) {
    if(event)
        event.preventDefault();
    fetch("http://localhost:3001/api/games/next/"+this.state.currentGameId)
      .then(response => response.json())
      .then(video => {
        this.props.setInfo(
          video.data.attributes["name"].toString(), 
          video.data.attributes["description"].toString()
        );
        if(video.data){
        this.setState({
            currentGameId: video.data.id,
            volume: 100,
            muted: false,
            playing: true,
            played: 0,
            loaded: 0,
            pip: false,
            currentVideo: video.data.attributes[
            "video-link"
          ].toString()
        });
      } else {
        this.setState({
          currentGameId: process.env.DEFAULT_GAME_ID,
          volume: 100,
          muted: false,
          playing: true,
          played: 0,
          loaded: 0,
          pip: false,
          currentVideo: process.env.DEFAULT_GAME_ID
      });
      }
      });
    this.state.ref.seekTo(0,'seconds');
    this.forceUpdate();
  }

  render() {
    return (
      <div onClick={this._pauseVideo}>
        <ReactPlayer
          url={this.state.currentVideo}
          className="video"
          ref={this.ref}
          volume={this.state.volume}
          muted={this.state.muted}
          playing={this.state.playing}
          onStart={this._onStart}
          onSeek={this._onSeek}
          onProgress={this._onProgress}
          onDuration={this._onDuration}
          onEnded={this._onEnded}
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                controls: 0,
                autohide: 1,
                showsearch: 0,
                rel: 0
              }
            }
          }}
        />
        <VideoControls
          played={this.state.played}
          _prevVideo={this._prevVideo}
          _nextVideo={this._nextVideo}
          _onSeekMouseDown={this._onSeekMouseDown}
          _onSeekChange={this._onSeekChange}
          _onSeekMouseUp={this._onSeekMouseUp}
        />
      </div>
    );
  }
}

export default VideoPlayer;
