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

  delete = async (event) => {
    event.preventDefault();
    let url = "http://chronomy.herokuapp.com/playlists/" + this.state.uuid;
    await axios
      .delete(url, { withCredentials: true })
      .then((response) => {
        this.props.remove_playlist(this.state.uuid);
      })
      .catch((error) => console.log(error));
  };

  edit = (event) => {
    event.preventDefault();
    this.props.history.push("/editPlaylist/" + this.state.uuid);
  };

  copy = () => {
    copy(window.location.protocol + "//" + window.location.host + "/view/" + this.state.uuid);
  };

  render() {
    return (
      <div className="playlistHeader">
        <p className="tik-tok-title title">{this.state.title}</p>
        <p className="uuid">
          <small>UUID: {this.state.uuid}</small>
        </p>
        <button className="button patsbutton delete" onClick={this.delete}>
          Delete
        </button>
        <button className="button patsbutton edit" onClick={this.edit}>
          Edit
        </button>
        <br></br>
        <button onClick={this.copy} className="patsbutton uuid">
          <small>Copy shareable link to clipboard</small>
        </button>
      </div>
    );
  }
}

export default PlaylistHeader;
