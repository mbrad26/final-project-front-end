import React, { Component } from "react";

class PlaylistHeader extends Component {
  state = { id: this.props.id, title: this.props.title, link: this.props.link };

  delete = () => {
    //API Request to delete
  };

  edit = () => {
    //Open up Make playlist component
  };

  render() {
    return (
      <div className="playlistHeader">
        <h4 className="title">{this.state.title}</h4>
        <h5 className="link">Link: {this.state.link}</h5>
        <button className="button" onClick={this.delete}>
          Delete
        </button>
        <button className="button" onClick={this.edit}>
          Edit
        </button>
      </div>
    );
  }
}

export default PlaylistHeader;
