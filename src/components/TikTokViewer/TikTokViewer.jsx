import React, { Component } from "react";
import axios from "axios";
import Buttons from '../Buttons/Buttons';
import './TikTokViewer.css'


class TikTokViewer extends Component {

  state = {
    playlist: [
  	'https://www.tiktok.com/@lzz03/video/6840824663585639686',
  	'https://www.tiktok.com/@pegleg89/video/6825998203897285893',
  	'https://www.tiktok.com/@bboyrockbittu/video/6840874385415343361',
  	'https://www.tiktok.com/@itsoraida/video/6841342984550731014',
  	'https://www.tiktok.com/@pinknews/video/6841577503472061702'
    ],
    title: null,
    url: null,
    currentClip: 0
  };

  handleNext = () => {

    this.setState({
      currentClip: ++this.state.currentClip
    })
    this.tikTokApi(this.state.playlist[this.state.currentClip])

  }

  handlePrevious = () => {

    this.setState({
      currentClip: --this.state.currentClip
    })
    this.tikTokApi(this.state.playlist[this.state.currentClip])

  }

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
    this.tikTokApi(this.state.playlist[0]);
  };

  render = () => {
    return (
      <div className="tik-tok-viewer" data-cy="tik-tok">
        {this.state.title}<br />
        <video src={this.state.url} controls muted autoPlay loop height='480' width='250'/>
        <Buttons handleNext={this.handleNext} handlePrevious={this.handlePrevious} />
      </div>
    );
  };
}

export default TikTokViewer;
