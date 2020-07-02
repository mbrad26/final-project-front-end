import React, { Component } from "react";
import copy from "copy-to-clipboard";
import axios from "axios";
import "./PlaylistHeader.css";

class PlaylistHeader extends Component {
  state = {
    id: this.props.id,
    title: this.props.title,
    uuid: this.props.uuid,
  };

  delete = async () => {
    let url = "http://chronomy.herokuapp.com/playlists/" + this.state.uuid;
    await axios
      .delete(url, { withCredentials: true })
      .then((response) => {
        this.props.remove_playlist(this.state.uuid);
      })
      .catch((error) => console.log(error));
  };

  edit = () => {
    this.props.history.push("/editPlaylist/" + this.state.uuid);
  };

  copy = () => {
    copy(this.state.uuid);
  };

  render() {
    return (
      <div className="playlistHeader">
        <p className="tik-tok-title">{this.state.title}</p>

        <button className="button patsbutton" onClick={this.delete}>
          Delete
        </button>
        <button className="button patsbutton" onClick={this.edit}>
          Edit
        </button>
        <br></br>
        <button onClick={this.copy} className="patsbutton uuid">
          <small>Copy UUID to clipboard</small>
        </button>
      </div>
    );
  }
}

export default PlaylistHeader;
