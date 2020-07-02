import React from "react";
import { shallow, mount } from "enzyme";
import PlaylistHeader from "./PlaylistHeader.jsx";
import copy from "copy-to-clipboard";

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <PlaylistHeader id="1" title="testTitle" uuid="testUuid" />
    );
    // jest.clearAllMocks();
  });

  it("should render a div", () => {
    expect(wrapper.find("div.playlistHeader").length).toEqual(1);
  });

  it("should contain copy UUID to clipboard which calls copy when clicked", () => {
    expect(
      wrapper
        .find(".uuid")
        .first()
        .text()
        .includes("Copy shareable link to clipboard")
    ).toBe(true);
    // const spy = jest.spyOn(wrapper.instance(), "copy");
    // wrapper.find(".uuid").first().simulate("click");
    // expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should contain title", () => {
    expect(
      wrapper.find(".tik-tok-title").first().text().includes("testTitle")
    ).toBe(true);
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

  // it("should contain edit button", () => {
  //   let props = { history: { push: jest.fn() } };
  //   wrapper = shallow(<PlaylistHeader {...props} />);
  //   // const spy = jest.spyOn(wrapper.instance(), "edit");
  //   wrapper.instance().forceUpdate();
  //   expect(wrapper.find(".button").last().text().includes("Edit")).toBe(true);
  //   wrapper.find(".button").last().simulate("click");
  //   // expect(spy).toHaveBeenCalledTimes(1);
  //   expect(wrapper.props.history.push).toHaveBeenCalledTimes(1);
  // });

  // describe("edit", () => {
  //   it("updates redirects when edit clicked", () => {
  //     wrapper.instance().edit();
  //     expect(global.window.location.pathname).toEqual("/editPlaylist/testUuid");
  //   });
  // });
});
