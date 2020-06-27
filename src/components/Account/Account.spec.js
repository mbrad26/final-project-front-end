import React from "react";
import { shallow, mount } from "enzyme";
import Account from "./Account.jsx";
import PlaylistHeader from "../PlaylistHeader/PlaylistHeader.jsx";

describe("Account", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Account />);
  });

  it("should render a div", () => {
    expect(wrapper.find("div.account").length).toEqual(1);
  });

  it("should contain title", () => {
    expect(wrapper.find(".pageTitle").text().includes("My Playlists")).toBe(
      true
    );
  });

  it("should contain add playlist button", () => {
    expect(
      wrapper.find(".button").first().text().includes("Add Playlist")
    ).toBe(true);
  });

  it("runs component did mount function", () => {
    wrapper = mount(<Account />);
    const spy = jest.spyOn(wrapper.instance(), "componentDidMount");
    wrapper.instance().forceUpdate();
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  it("contains Playlist Header components of playlists in state", () => {
    wrapper = mount(<Account />);
    wrapper.setState({
      userPlaylists: [
        { id: "1", title: "playlist1", link: "jfgsjdhfgkshfgsjhafg" },
        { id: "2", title: "playlist2", link: "qfgqeoufeuguefdaa" },
        { id: "3", title: "playlist3", link: "efqeufgqoufgqeufgue" },
      ],
    });
    expect(wrapper.find(PlaylistHeader).length).toBe(3);
  });
});
