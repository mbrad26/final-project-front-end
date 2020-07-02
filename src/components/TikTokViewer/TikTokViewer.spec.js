import React from "react";
import { shallow, mount } from "enzyme";
import TikTokViewer from "./TikTokViewer";
import Buttons from "../Buttons/Buttons";

describe("TikTokViewer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <TikTokViewer required={true} match={{ params: { uuid: "new" } }} />
    );
    wrapper.setState({
      tikToks: [
        { title: "title1", mp4_url: "testUrl1" },
        { title: "title2", mp4_url: "testUrl2" },
        { title: "title3", mp4_url: "testUrl3" },
      ],
      currentClip: 0,
      title: "",
      src: "",
    });
  });

  it("should render a div", () => {
    expect(wrapper.find("div.tik-tok-viewer").length).toEqual(1);
  });

  it("should render Buttons component", () => {
    expect(wrapper.find("button").length).toEqual(2);
  });

  it("runs component did mount function", () => {
    wrapper = mount(
      <TikTokViewer required={true} match={{ params: { uuid: "new" } }} />
    );
    const spy = jest.spyOn(wrapper.instance(), "componentDidMount");
    wrapper.instance().forceUpdate();
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  describe("handle next", () => {
    it("updates state when clicked", () => {
      let instance = wrapper.instance();
      instance.handleNext();
      expect(wrapper.state().currentClip).toBe(1);
      expect(wrapper.state().title).toBe("title2");
      expect(wrapper.state().src).toBe("testUrl2");
      instance.handleNext();
      expect(wrapper.state().currentClip).toBe(2);
      expect(wrapper.state().title).toBe("title3");
      expect(wrapper.state().src).toBe("testUrl3");
      instance.handleNext();
      expect(wrapper.state().currentClip).toBe(0);
      expect(wrapper.state().title).toBe("title1");
      expect(wrapper.state().src).toBe("testUrl1");
    });
  });

  describe("handle previous", () => {
    it("updates state when clicked", () => {
      let instance = wrapper.instance();
      instance.handlePrevious();
      expect(wrapper.state().currentClip).toBe(2);
      expect(wrapper.state().title).toBe("title3");
      expect(wrapper.state().src).toBe("testUrl3");
      instance.handlePrevious();
      expect(wrapper.state().currentClip).toBe(1);
      expect(wrapper.state().title).toBe("title2");
      expect(wrapper.state().src).toBe("testUrl2");
      instance.handlePrevious();
      expect(wrapper.state().currentClip).toBe(0);
      expect(wrapper.state().title).toBe("title1");
      expect(wrapper.state().src).toBe("testUrl1");
    });
  });
});
