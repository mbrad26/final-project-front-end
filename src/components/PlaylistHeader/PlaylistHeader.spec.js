import React from "react";
import { shallow, mount } from "enzyme";
import PlaylistHeader from "./PlaylistHeader.jsx";
import { createMemoryHistory } from "history";
import * as axios from 'axios';

jest.mock('axios');

describe("App", () => {
  let wrapper;
  let props;
  let event;

  beforeEach(() => {
    event = { preventDefault: jest.fn() };
    props = { history: createMemoryHistory('/'), id: "1", title: "testTitle", uuid: "testUuid" }
    wrapper = mount(
      <PlaylistHeader {...props} />
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

    it("should make a delete request", async () => {
      const mockData = { "status": 200, };

      wrapper.find('button.delete').simulate('submit', event);
      axios.post.mockResolvedValue(mockData);
      wrapper.instance().forceUpdate();

      await expect(axios.post).toHaveBeenCalled();
    });
  });

  describe("edit", () => {

    it("should contain edit button", () => {
      let history = { push: jest.fn() };

      console.log(wrapper.instance().props.history);
      console.log("BUTTON", wrapper.find("button.edit").last());

      wrapper.find("button.edit").simulate("submit", event);

      expect(history.push).toHaveBeenCalled();
    });
  });
});
