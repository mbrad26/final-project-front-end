import React, { Component } from "react";
import axios from "axios";
import Buttons from "../Buttons/Buttons";
import "./TikTokViewer.css";
import { faPlay, faPause, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class TikTokViewer extends Component {
  state = {
    tikToks: [],
    currentClip: 0,
    title: "",
    src: "",
    uuid: this.props.match.params.uuid,
    playPause: "<FontAwesomeIcon icon={faVolumeUp} />",
    // playPause: "P",

    // muteUnmute: "<i className='fas fa-volume-mute'></i>",
    // muteUnmute: "<FontAwesomeIcon icon={faPlay} />",
    muteUnmute: "U",
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
      playing: !this.state.playing
    });
    // this.state.playing ? this.refs.vidRef.muted=false : this.refs.vidRef.muted=true;
    this.state.playing ? this.refs.vidRef.pause() : this.refs.vidRef.play();
    // this.state.playing ? this.refs.vidRef.volume = 1 : this.refs.vidRef.volume = 0;
    this.state.playing ? this.state.playPause=">" : this.state.playPause="||"
    // this.state.playing ? this.state.playPause="<i className='fas fa-volume-up'></i>" : this.state.playPause="<i className='fas fa-volume-mute'></i>"
    // this.state.playing ? this.state.playPause="MUTE" : this.state.playPause="UNMUTE"
    // this.refs.vidRef.play();
  }

  muteVideo() {
    this.setState({
      muted: !this.state.muted
    });
    this.state.muted ? this.refs.vidRef.muted=false : this.refs.vidRef.muted=true;
    // this.state.muted ? this.state.muteUnmute="M" : this.state.muteUnmute="U"
    console.log()
  }

        // <button className="play btn-block btn-lg" onClick={this.playVideo.bind(this)}>PLAY</button>
        // <button className="play btn-block btn-lg" onClick={this.muteVideo.bind(this)}>{this.state.muteUnmute}</button>
// <button className="play btn-block btn-lg" onClick={this.playVideo.bind(this)}>{this.state.playPause}</button>
        // <button className="play btn-block btn-lg" onClick={this.playVideo.bind(this)}>{this.state.playPause}</button>
        //         <button className="play btn-block btn-lg" onClick={this.playVideo.bind(this)}>{this.state.playPause}</button>

        // <button type="button" className="previous btn btn-block btn-lg" onClick={this.handlePrevious}><i class="arrow up"></i></button>  
        // <button className="next btn btn-block btn-lg" onClick={this.handleNext}><i class="arrow down"></i></button>

  showMute() {
    if (this.state.muted === false){
      return (<FontAwesomeIcon icon={faVolumeUp} />)
    } else {
      return (<FontAwesomeIcon icon={faVolumeMute} />)
    }
  }

  showPlay() {
    if (this.state.playing === true){
      return (<FontAwesomeIcon icon={faPause} />)
    } else {
      return (<FontAwesomeIcon icon={faPlay} />)
    }
  }

  render = () => {
    return (
      <div className="tik-tok-viewer" data-cy="tik-tok">
        <div className="content">
        <p className="previous" onClick={this.handlePrevious}><i className="arrow up"></i></p>  
          <div className="embed-responsive embed-responsive-9by16">
            <video className="embed-responsive-item" ref="vidRef" src={this.state.src} loop playsInline autoPlay muted />
            <div className="tik-tok-title bottom-left">{this.state.title}</div>
            <div className="controls">
              <div className="mute-container top-right"><p className=" mute " onClick={this.muteVideo.bind(this)}>{this.showMute()}</p></div>
              <p className=" play centered" onClick={this.playVideo.bind(this)}>{this.showPlay()}</p>
            </div>
          </div>   
          <FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /> <FontAwesomeIcon icon={faVolumeUp} /> <FontAwesomeIcon icon={faVolumeMute } />     
         <p className="next" onClick={this.handleNext}><i className="arrow down"></i></p>
        </div>
      </div>
    );
  };
}

export default TikTokViewer;
