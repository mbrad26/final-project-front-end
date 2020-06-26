import React from "react";
import { shallow } from "enzyme";
import TikTokViewer from "./TikTokViewer";
import Buttons from "../Buttons/Buttons";

describe("TikTokViewer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TikTokViewer />);
    wrapper.setState({
      tikToks: [
        { title: "title1", video_url: "testUrl1" },
        { title: "title2", video_url: "testUrl2" },
        { title: "title3", video_url: "testUrl3" },
      ],
      currentClip: 0,
      title: "",
      src: "",
    });
  });

  it("should render a div", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("should render Buttons component", () => {
    expect(wrapper.containsMatchingElement(<Buttons />)).toEqual(true);
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
