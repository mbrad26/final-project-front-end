import React, { Component } from "react";
import axios from "axios";
import Buttons from "../Buttons/Buttons";
import "./TikTokViewer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {FaCaretDown, FaCaretUp} from 'react-icons/fa/index';



class TikTokViewer extends Component {
  state = {
    tikToks: [],
    currentClip: 0,
    title: "",
    src: "",
    uuid: this.props.match.params.uuid,
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

  render = () => {
    return (
      <div className="tik-tok-viewer" data-cy="tik-tok">
      <button type="button" className="previous btn-block btn-lg" onClick={this.handlePrevious}><i class="arrow up"></i></button>  
        <div className="content">
          <div className="embed-responsive embed-responsive-9by16">
            <video className="embed-responsive-item" src={this.state.src} controls loop />
          </div>
        </div>
        <button className="next btn-block btn-lg" onClick={this.handleNext}><i class="arrow down"></i></button>
        <div className="tik-tok-title">{this.state.title}</div>
      </div>
    );
  };
}

export default TikTokViewer;
