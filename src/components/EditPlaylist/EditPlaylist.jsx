import React, { Component } from "react";
import axios from "axios";

class EditPlaylist extends Component {
  state = {
    tikToks: [],
    uuid: this.props.match.params.uuid,
    value: "",
    newTikToks: [],
  };

  componentDidMount = () => {
    if (this.state.uuid !== "new") {
      this.api();
    }
  };

  delete = (index) => {
    // delete tiktok from array
    let newArray = this.state.tikToks;
    newArray.splice(index, 1);
    this.setState({
      tikToks: newArray,
    });
    // API CALL TO DELETE TiKTOK FROM PLAYLIST on DB goes here
  };

  api = () => {
    axios
      .get(
        "https://chronomy.herokuapp.com/placeholder/playlist/40c5b468-13af-483d-8728-eb4f85a9f765"
      )
      .then((response) => {
        this.setState({
          tikToks: response.data,
        });
      });
  };

  save = () => {
    //api request to save
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let array = this.state.newTikToks;
    array.push(this.state.value);
    this.setState({
      newTikToks: array,
      value: "",
    });
    // all new tiktoks to add are saved array in state.newTikToks
    // API Request to tik tok to get API
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    let elements = [];
    for (let i = 0; i < this.state.tikToks.length; i++) {
      elements.push(
        <div className="tik-tok" key={i} id={"tikTok" + i}>
          <h5>{this.state.tikToks[i].title}</h5>
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
        <div className="add">
          <form onSubmit={this.handleSubmit}>
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
