import React from "react";
import { shallow, mount } from "enzyme";
import EditPlaylist from "./EditPlaylist.jsx";

describe("EditPlaylist", () => {
  let wrapper;
  let mockEvent;

  beforeEach(() => {
    wrapper = shallow(
      <EditPlaylist
        required={true}
        match={{ params: { uuid: "jhjegfdsjhgfsdfgdf" } }}
      />
    );
    mockEvent = {
      target: {
        value: "changedvalue",
      },
    };
    wrapper.setState({
      tikToks: [
        {
          title: "testTitle1",
          video_url: "testUrl1",
        },
        {
          title: "testTitle2",
          video_url: "testUrl2",
        },
      ],
    });
  });

  it("should render a div", () => {
    expect(wrapper.find("div.edit-playlist").length).toEqual(1);
  });

  it("should save uuid in params in state", () => {
    expect(wrapper.state("uuid")).toEqual("jhjegfdsjhgfsdfgdf");
  });

  it("contains titles of tiktoks in playlist", () => {
    expect(wrapper.find(".tik-tok").first().text().includes("testTitle1")).toBe(
      true
    );
    expect(wrapper.find(".tik-tok").last().text().includes("testTitle2")).toBe(
      true
    );
  });

  // Need to add test for adding/changing title

  it("contains delete button for each tiktok", () => {
    expect(wrapper.find(".delete-button").length).toEqual(2);
  });

  describe("delete", () => {
    it("deletes from state when delete button clicked", () => {
      const spy = jest.spyOn(wrapper.instance(), "delete");
      wrapper.instance().forceUpdate();
      wrapper.find(".delete-button").first().simulate("click");
      expect(spy).toHaveBeenCalledTimes(1);
      expect(wrapper.state("tikToks")).toEqual([
        {
          title: "testTitle2",
          video_url: "testUrl2",
        },
      ]);
    });
  });

  describe("handleChange", () => {
    let mockEvent;

    beforeEach(() => {
      mockEvent = {
        target: {
          value: "changedvalue",
        },
      };
    });

    it("should be called when a change is detected", () => {
      const spy = jest.spyOn(wrapper.instance(), "handleChange");
      wrapper.instance().forceUpdate();
      expect(spy).toHaveBeenCalledTimes(0);
      wrapper.find("#input").simulate("change", mockEvent);
      expect(spy).toHaveBeenCalledWith(mockEvent);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("updates the state with event value", () => {
      wrapper.find("#input").simulate("change", mockEvent);
      expect(wrapper.state("value")).toEqual("changedvalue");
    });
  });
  describe("handleSubmit", () => {
    it("should be called when a change is detected", () => {
      const spy = jest.spyOn(wrapper.instance(), "handleSubmit");
      wrapper.instance().forceUpdate();
      wrapper.find("#input").simulate("change", mockEvent);
      wrapper.find("form").first().simulate("submit", {
        preventDefault: jest.fn(),
      });
      expect(spy).toHaveBeenCalledTimes(1);
      expect(wrapper.state("newTikToks")).toEqual(["changedvalue"]);
    });
  });

  describe("added tiktoks", () => {
    it("contains Added TikToks text", () => {
      expect(
        wrapper
          .find(".added-tik-toks")
          .first()
          .text()
          .includes("Added Tik-Toks")
      ).toBe(true);
    });
    it("adds new tiktok urls to the page", () => {
      wrapper.find("#input").simulate("change", mockEvent);
      wrapper.find("form").first().simulate("submit", {
        preventDefault: jest.fn(),
      });
      expect(
        wrapper.find(".added-tik-toks").first().text().includes("changedvalue")
      ).toBe(true);
    });
  });

  describe("save/update", () => {
    it("has save button", () => {
      expect(
        wrapper.find(".save-button").text().includes("Save/Update Playlist")
      ).toBe(true);
    });
    it("calls save function when pressed", () => {
      const spy = jest.spyOn(wrapper.instance(), "save");
      wrapper.instance().forceUpdate();
      wrapper.find(".save-button").simulate("click");
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
