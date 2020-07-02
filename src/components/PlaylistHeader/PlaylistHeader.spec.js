import React from "react";
import { shallow, mount } from "enzyme";
import PlaylistHeader from "./PlaylistHeader.jsx";
import { createMemoryHistory } from "history";

describe("App", () => {
  let wrapper;
  let props;
  let event;

  beforeEach(() => {
    event = { preventDefault: jest.fn() };
    props = { history: createMemoryHistory('/'), id: "1", title: "testTitle", uuid: "testUuid" }
    wrapper = mount(
      <PlaylistHeader id="1" title="testTitle" uuid="testUuid" history={ createMemoryHistory('/') } />
    );
    jest.clearAllMocks();
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
    expect(wrapper.find(".button").first().text().includes("Delete")).toBe(true);
    wrapper.find(".button").first().simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe("delete", () => {


    it("should contain edit button", () => {
      let history = { push: jest.fn() };
      // let push = jest.fn();
      let spy = jest.spyOn(history, 'push');

      console.log(wrapper.instance().props.history);
      console.log("BUTTON", wrapper.find("button.edit").last());

      wrapper.find("button.edit").simulate("click");

      wrapper.instance().edit(event);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("edit", () => {
    // it("updates redirect in state", () => {
    //   wrapper.instance().edit();
    //   expect(wrapper.state("redirect")).toEqual("/editPlaylist/testUuid");
    // });

    it("should contain edit button", () => {
      let history = { push: jest.fn() };
      // let push = jest.fn();
      let spy = jest.spyOn(history, 'push');

      console.log(wrapper.instance().props.history);
      console.log("BUTTON", wrapper.find("button.edit").last());

      wrapper.find("button.edit").simulate("click");

      wrapper.instance().edit(event);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
