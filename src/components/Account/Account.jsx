import React, { Component } from "react";
import PlaylistHeader from "../PlaylistHeader/PlaylistHeader.jsx";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./Account.css";

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
        this.title_check(response.data.playlists_by_user);
      })
      .catch(() => console.log("ERROR"));
  };

  title_check = (array) => {
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      if (array[i].title == "") {
        array[i].title = "Untitled";
      }
    }
    this.setState({
      userPlaylists: array,
    });
  };

  addPlaylist = () => {
    this.setState({
      redirect: "/editPlaylist/new",
    });
  };

  remove_playlist = (uuid) => {
    let array = this.state.userPlaylists.filter((playlist) => {
      return playlist.uuid != uuid;
    });
    this.setState({
      userPlaylists: array,
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
          remove_playlist={this.remove_playlist}
        />
      );
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      return (
        <div className="account">
          <p className="pageTitle">My Playlists</p>
          <button className="button patsbutton" onClick={this.addPlaylist}>
            Add Playlist
          </button>
          <br></br>
          <br></br>
          <div className="playlists">{elements}</div>
        </div>
      );
    }
  }
}

export default Account;
