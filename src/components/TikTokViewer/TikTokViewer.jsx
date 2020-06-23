import React, { Component } from "react";
import axios from "axios";

class TikTokViewer extends Component {
  state = {
    suffix: "https://vm.tiktok.com/JeJCFTp/",
    title: null,
    thumbnail_url: null,
  };

  componentDidMount = () => {
    const prefix = "https://www.tiktok.com/oembed?url=";
    axios.get(prefix + this.state.suffix).then((response) => {
      this.setState({
        title: response.data.title,
        thumbnail_url: response.data.thumbnail_url,
      });
      console.log(this.state.thumbnail_url);
    });
  };

  render = () => {
    return (
      <div className="tik-tok-viewer" data-cy="tik-tok">
        {this.state.title}
      </div>
    );
  };
}

export default TikTokViewer;
