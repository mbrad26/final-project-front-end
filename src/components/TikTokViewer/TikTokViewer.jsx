import React, { Component } from "react";
import axios from "axios";
import Buttons from '../Buttons/Buttons';
import './TikTokViewer.css'


class TikTokViewer extends Component {
  state = {
    suffix: "https://www.tiktok.com/@lzz03/video/6840824663585639686",
    title: null,
    url: null,
  };

  tikTokApi = (url) => {
    const prefix = "https://www.tiktok.com/oembed?url=";
    axios.get(prefix + url).then((response) => {
      this.setState({
        title: response.data.title,
      });
    });
    axios.post("https://tiktok.fail/api/geturl", 'url=' + url)
      .then((response) => {
        this.setState({url: response.data.direct})
      })
  }

  componentDidMount = () => {
    this.tikTokApi(this.state.suffix);
  };

  render = () => {
    return (
      <div className="tik-tok-viewer" data-cy="tik-tok">
        {this.state.title}
        <video src={this.state.url} controls autoPlay loop muted />
        <Buttons />
      </div>
    );
  };
}

export default TikTokViewer;
