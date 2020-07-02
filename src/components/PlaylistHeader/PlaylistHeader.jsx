import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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

  render() {
    return (
      <div className="playlistHeader">
        <p className="title">{this.state.title}</p>
        <p className="uuid">
          <small>UUID: {this.state.uuid}</small>
        </p>
        <button className="button delete" onClick={this.delete}>
          Delete
        </button>
        <button className="button edit" onClick={this.edit}>
          Edit
        </button>
      </div>
    );
  }
}

export default PlaylistHeader;
