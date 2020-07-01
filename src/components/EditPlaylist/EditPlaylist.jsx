import React, { Component } from "react";
import axios from "axios";

class EditPlaylist extends Component {
  state = {
    tikToks: [],
    uuid: this.props.match.params.uuid,
    value: "",
    newTikToks: [],
    title: "",
  };

  componentDidMount = () => {
    if (this.state.uuid !== "new") {
      this.api();
    }
  };

  delete = (index) => {
    let newArray = this.state.tikToks;
    newArray.splice(index, 1);
    this.setState({
      tikToks: newArray,
    });
  };

  api = async () => {
    let url = "http://chronomy.herokuapp.com/playlists/" + this.state.uuid;
    await axios
      .get(url, { withCredentials: true })
      .then((response) => {
        let title = "Untitled";
        if (response.data.playlist.title != "") {
          title = response.data.playlist.title;
        }
        this.setState({
          tikToks: response.data.tiktoks,
          title: title,
        });
      })
      .catch((error) => console.log(error));
  };

  save_new_playlist = async () => {
    let url = "http://chronomy.herokuapp.com/playlists/";
    await axios
      .post(
        url,
        {
          playlist: {
            title: this.state.title,
            tiktoks: this.state.newTikToks,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        //redirect
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  update_playlist = async () => {
    let array = this.state.tikToks
      .map((tiktok) => tiktok.original_url)
      .concat(this.state.newTikToks);
    let url = "http://chronomy.herokuapp.com/playlists/" + this.state.uuid;
    await axios
      .put(
        url,
        {
          playlist: {
            title: this.state.title,
            tiktoks: array,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        //redirect
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  save = () => {
    this.state.uuid == "new"
      ? this.save_new_playlist()
      : this.update_playlist();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let array = this.state.newTikToks;
    array.push(this.state.value);
    this.setState({
      newTikToks: array,
      value: "",
    });
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  tiktok_title_check = (title) => {
    return title == "" ? "Untitled" : title;
  };

  render() {
    let elements = [];
    for (let i = 0; i < this.state.tikToks.length; i++) {
      elements.push(
        <div className="tik-tok" key={i} id={"tikTok" + i}>
          <h5>{this.tiktok_title_check(this.state.tikToks[i].title)}</h5>
          <button
            className="delete-button"
            onClick={() => {
              this.delete(i);
            }}
          >
            Delete
          </button>
        </div>
      );
    }

    let added = [];
    for (let i = 0; i < this.state.newTikToks.length; i++) {
      added.push(
        <div className="aded" key={i} id={"added" + i}>
          <p>{this.state.newTikToks[i]}</p>
        </div>
      );
    }

    return (
      <div className="edit-playlist">
        <label>Playlist Title: {this.state.title}</label>
        <br></br>
        <input
          type="text"
          onChange={this.handleChangeTitle}
          name="titleInput"
          placeholder={this.state.title}
          id="title"
        />
        <div className="add">
          <form onSubmit={this.handleSubmit}>
            <label>Add TikTok</label>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              name="tikTokLink"
              placeholder="Tik-Tok link"
              required
              id="input"
            />
            <button type="submit" id="submit">
              Add
            </button>
          </form>
          <div className="added-tik-toks">
            <h5>Added Tik-Toks:</h5>
            <div>{added}</div>
            <button className="save-button" onClick={this.save}>
              Save/Update Playlist
            </button>
          </div>
        </div>
        {elements}
      </div>
    );
  }
}

export default EditPlaylist;
