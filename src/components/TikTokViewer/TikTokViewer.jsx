import React, { Component } from "react";
import axios from "axios";
import Buttons from "../Buttons/Buttons";
import "./TikTokViewer.css";

class TikTokViewer extends Component {
  state = {
    tikToks: [],
    currentClip: 0,
    title: "",
    src: "",
    uuid: this.props.match.params.uuid,
    playPause: "PLAY",
    muteUnmute: "UNMUTE",
  };

  handleNext = () => {
    if (this.state.currentClip >= this.state.tikToks.length - 1) {
      this.setState({ currentClip: 0 });
    } else {
      this.setState({ currentClip: this.state.currentClip + 1 });
    }
    this._update();
  };

  handlePrevious = () => {
    if (this.state.currentClip <= 0) {
      this.setState({ currentClip: this.state.tikToks.length - 1 });
    } else {
      this.setState({ currentClip: this.state.currentClip - 1 });
    }
    this._update();
  };

  _update = () => {
    this.setState({
      title: this.state.tikToks[this.state.currentClip].title,
      src: this.state.tikToks[this.state.currentClip].mp4_url,
    });
  };

  componentDidMount = async () => {
    let url = "http://chronomy.herokuapp.com/playlists/" + this.state.uuid;
    await axios
      .get(url, { withCredentials: true })
      .then((response) => {
        this.setState({
          tikToks: response.data.tiktoks,
          title: response.data.tiktoks[0].title,
          src: response.data.tiktoks[0].mp4_url,
        });
      })
      .catch((error) => console.log(error));
  };

  playVideo() {
    this.setState({
      playing: !this.state.playing,
    });
    this.state.playing ? this.refs.vidRef.pause() : this.refs.vidRef.play();
    // this.state.playing ? this.refs.vidRef.volume = 1 : this.refs.vidRef.volume = 0;
    this.state.playing
      ? (this.state.playPause = "PLAY")
      : (this.state.playPause = "PAUSE");
    // this.refs.vidRef.play();
  }

  muteVdeo() {
    // this.setState({
    //   muted: !this.state.muted
    // });
    // this.state.muted ? this.refs.vidRef.volume = 1 : this.refs.vidRef.volume = 0 ;
    // this.state.muted ? this.state.muteUnmute="MUTE" : this.state.muteUnmute="UNMUTE"
    this.refs.vidRef.volume = 1;
  }

  // <button className="play btn-block btn-lg" onClick={this.playVideo.bind(this)}>PLAY</button>
  // <button className="play btn-block btn-lg" onClick={this.muteVideo.bind(this)}>{this.state.muteUnmute}</button>
  // <button className="play btn-block btn-lg" onClick={this.playVideo.bind(this)}>{this.state.playPause}</button>
  // <button className="play btn-block btn-lg" onClick={this.playVideo.bind(this)}>{this.state.playPause}</button>

  render = () => {
    return (
      <div className="tik-tok-viewer" data-cy="tik-tok">
        <button
          type="button"
          className="previous btn-block btn-lg"
          onClick={this.handlePrevious}
        >
          <i className="arrow up"></i>
        </button>
        <div className="content">
          <div className="embed-responsive embed-responsive-9by16">
            <video
              className="embed-responsive-item"
              ref="vidRef"
              src={this.state.src}
              loop
              playsInline
            />
            <div className="tik-tok-title bottom-left">{this.state.title}</div>
          </div>
        </div>

        <button className="next btn-block btn-lg" onClick={this.handleNext}>
          <i className="arrow down"></i>
        </button>
      </div>
    );
  };
}

export default TikTokViewer;
