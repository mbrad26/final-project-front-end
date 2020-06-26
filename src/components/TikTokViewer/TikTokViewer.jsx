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
      src: this.state.tikToks[this.state.currentClip].video_url,
    });
  };

  componentDidMount = () => {
    axios
      .get(
        "https://chronomy.herokuapp.com/placeholder/playlist/40c5b468-13af-483d-8728-eb4f85a9f765"
      )
      .then((response) => {
        this.setState({
          tikToks: response.data,
          title: response.data[0].title,
          src: response.data[0].video_url,
        });
      });
  };

  render = () => {
    return (
      <div className="tik-tok-viewer" data-cy="tik-tok">
        {this.state.title}
        <br />
        <video src={this.state.src} controls loop height="480" width="250" />
        <Buttons
          handleNext={this.handleNext}
          handlePrevious={this.handlePrevious}
        />
      </div>
    );
  };
}

export default TikTokViewer;
