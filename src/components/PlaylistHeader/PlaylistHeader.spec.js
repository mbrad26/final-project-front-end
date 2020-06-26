import React from "react";
import { shallow, mount } from "enzyme";
import PlaylistHeader from "./PlaylistHeader.jsx";
describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <PlaylistHeader id="1" title="testTitle" link="testLink" />
    );
  });

  it("should render a div", () => {
    expect(wrapper.find("div.playlistHeader").length).toEqual(1);
  });

  it("should contain link", () => {
    expect(wrapper.find(".link").text().includes("Link: testLink")).toBe(true);
  });

  it("should contain link", () => {
    expect(wrapper.find(".title").text().includes("testTitle")).toBe(true);
  });

  it("should contain edit button", () => {
    expect(wrapper.find(".button").first().text().includes("Delete")).toBe(
      true
    );
  });

  it("should contain delete button", () => {
    expect(wrapper.find(".button").last().text().includes("Edit")).toBe(true);
  });
});
