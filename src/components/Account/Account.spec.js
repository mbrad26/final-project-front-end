import React from "react";
import { shallow, mount } from "enzyme";
import Account from "./Account.jsx";
import PlaylistHeader from "../PlaylistHeader/PlaylistHeader.jsx";

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Account />);
  });

  it("should render a div", () => {
    expect(wrapper.find("div.account").length).toEqual(1);
  });

  it("should contain link", () => {
    expect(wrapper.find(".pageTitle").text().includes("My Playlists")).toBe(
      true
    );
  });

  it("contains Playlist Header components of playlists in state", () => {
    let wrapper = mount(<Account />);
    let instance = wrapper.instance();
    wrapper.setState({
      userPlaylists: [
        { id: "1", title: "playlist1", link: "jfgsjdhfgkshfgsjhafg" },
        { id: "2", title: "playlist2", link: "qfgqeoufeuguefdaa" },
        { id: "3", title: "playlist3", link: "efqeufgqoufgqeufgue" },
      ],
    });
    expect(wrapper.find(PlaylistHeader).length).toBe(3);
  });

  // describe("api request", () => {
  //   const axios = require("axios");
  //   jest.mock("axios");

  //   class Playlists {
  //     static all() {
  //       return axios
  //         .get("www.disco-computer.com/api/user-playlists.json")
  //         .then((resp) => resp.data)
  //         .catch();
  //     }
  //   }
  //   const response = {
  //     headers: {
  //       "Access-Control-Allow-Headers": "Content-Type",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  //     },
  //     data: [
  //       {
  //         id: "1",
  //         title: "playlist1",
  //         link: "jfgsjdhfgkshfgsjhafg",
  //       },
  //       {
  //         id: "2",
  //         title: "playlist2",
  //         link: "qfgqeoufeuguefdaa",
  //       },
  //       {
  //         id: "3",
  //         title: "playlist3",
  //         link: "efqeufgqoufgqeufgue",
  //       },
  //     ],
  //   };
  //   const mockResponse = { data: mockPlaylists };
  //   axios.get.mockResolvedValue(mockResponse);

  //   Playlists.all().then((data) =>
  //     expect(wrapper.state("userPlaylists")).toEqual(data.data)
  //   );
  // });
});
