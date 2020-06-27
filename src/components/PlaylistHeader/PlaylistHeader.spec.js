import React from "react";
import { shallow, mount } from "enzyme";
import PlaylistHeader from "./PlaylistHeader.jsx";
describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <PlaylistHeader id="1" title="testTitle" uuid="testUuid" />
    );
  });

  it("should render a div", () => {
    expect(wrapper.find("div.playlistHeader").length).toEqual(1);
  });

  it("should contain uuid", () => {
    expect(wrapper.find(".uuid").text().includes("UUID: testUuid")).toBe(true);
  });

  it("should contain title", () => {
    expect(wrapper.find(".title").text().includes("testTitle")).toBe(true);
  });

  it("should contain delete button", () => {
    const spy = jest.spyOn(wrapper.instance(), "delete");
    wrapper.instance().forceUpdate();
    expect(wrapper.find(".button").first().text().includes("Delete")).toBe(
      true
    );
    wrapper.find(".button").first().simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should contain edit button", () => {
    const spy = jest.spyOn(wrapper.instance(), "edit");
    wrapper.instance().forceUpdate();
    expect(wrapper.find(".button").last().text().includes("Edit")).toBe(true);
    wrapper.find(".button").last().simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe("edit", () => {
    it("updates redirect in state", () => {
      wrapper.instance().edit();
      expect(wrapper.state("redirect")).toEqual("/editPlaylist/testUuid");
    });
  });
});
