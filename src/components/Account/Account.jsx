import React, { Component } from "react";
import PlaylistHeader from "../PlaylistHeader/PlaylistHeader.jsx";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Account extends Component {
  state = {
    user: this.props.user,
    userPlaylists: [],
    redirect: null,
  };

  componentDidMount = async () => {
    let url = "http://chronomy.herokuapp.com/playlists_by_user";
    await axios
      .get(url, { withCredentials: true })
      .then((response) => {
        this.setState({
          userPlaylists: response.data.playlists_by_user,
        });
      })
      .catch(() => console.log("ERROR"));
  };

  addPlaylist = () => {
    this.setState({
      redirect: "/editPlaylist/new",
    });
  };

  render() {
    let elements = [];
    for (let i = 0; i < this.state.userPlaylists.length; i++) {
      elements.push(
        <PlaylistHeader
          key={this.state.userPlaylists[i].id}
          id={this.state.userPlaylists[i].id}
          title={this.state.userPlaylists[i].title}
          uuid={this.state.userPlaylists[i].uuid}
        />
      );
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      return (
        <div className="account">
          <button className="button" onClick={this.addPlaylist}>
            Add Playlist
          </button>
          <h3 className="pageTitle">My Playlists</h3>
          <div className="playlists">{elements}</div>
        </div>
      );
    }
  }
}

export default Account;
