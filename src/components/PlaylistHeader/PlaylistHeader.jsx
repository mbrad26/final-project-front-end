import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class PlaylistHeader extends Component {
  state = {
    id: this.props.id,
    title: this.props.title,
    uuid: this.props.uuid,
    redirect: null,
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
    this.setState({
      redirect: "/editPlaylist/" + this.state.uuid,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else
      return (
        <div className="playlistHeader">
          <p className="title">{this.state.title}</p>
          <p className="uuid">UUID: {this.state.uuid}</p>
          <button className="button patsbutton" onClick={this.delete}>
            Delete
          </button>
          <button className="button patsbutton" onClick={this.edit}>
            Edit
          </button>
        </div>
      );
  }
}

export default PlaylistHeader;
