import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from "./styles.scss";

class VideoControls extends Component {
  render() {
    return (
      <div className="videocontrols">
        <span className="previous" onClick={this.props._prevVideo}></span>
        <input
          className="seek"
          type="range"
          min={0}
          max={1}
          step="any"
          value={this.props.played}
          onMouseDown={this.props._onSeekMouseDown}
          onChange={this.props._onSeekChange}
          onMouseUp={this.props._onSeekMouseUp}
        />
        <span className="next" onClick={this.props._nextVideo}></span>
      </div>
    );
  }
}

VideoControls.propTypes = {
    played: PropTypes.number.isRequired,
    _nextVideo: PropTypes.func.isRequired,
    _prevVideo: PropTypes.func.isRequired,
    _onSeekMouseDown: PropTypes.func.isRequired,
    _onSeekChange: PropTypes.func.isRequired,
    _onSeekMouseUp: PropTypes.func.isRequired
  };

export default VideoControls;
