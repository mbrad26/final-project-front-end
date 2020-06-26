import React, { Component } from "react";
import PlaylistHeader from "../PlaylistHeader/PlaylistHeader.jsx";
import axios from "axios";

class Account extends Component {
  state = {
    user: this.props.user,
    userPlaylists: [],
  };

  componentDidMount() {}

  render() {
    let elements = [];
    for (let i = 0; i < this.state.userPlaylists.length; i++) {
      elements.push(
        <PlaylistHeader
          key={this.state.userPlaylists[i].id}
          id={this.state.userPlaylists[i].id}
          title={this.state.userPlaylists[i].title}
          link={this.state.userPlaylists[i].link}
        />
      );
    }

    return (
      <div className="account">
        <h3 className="pageTitle">My Playlists</h3>
        <div className="playlists">{elements}</div>
      </div>
    );
  }
}

export default Account;
