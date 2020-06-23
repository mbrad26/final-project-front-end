import React, { Component } from "react";
import axios from "axios";
import Buttons from '../Buttons/Buttons'

class TikTokViewer extends Component {
  state = {
    suffix: "https://vm.tiktok.com/JeJCFTp/",
    title: null,
    html: null,
  };

  componentDidMount = () => {
    const prefix = "https://www.tiktok.com/oembed?url=";
    axios.get(prefix + this.state.suffix).then((response) => {
      this.setState({
        title: response.data.title,
        html: response.data.html
      });
    });
  };

  render = () => {
    return (
      <div className="tik-tok-viewer" data-cy="tik-tok">
        {this.state.title}
        {this.state.html}
        <Buttons />
        // <button className="previous">Previous</button>
        // <button className="next">Next</button>
      </div>
    );
  };
}

export default TikTokViewer;
