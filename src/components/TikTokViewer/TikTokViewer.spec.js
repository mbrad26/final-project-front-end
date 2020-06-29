
import React from "react";
import { shallow, mount } from "enzyme";
import TikTokViewer from "./TikTokViewer";
import Buttons from "../Buttons/Buttons";

describe('TikTokViewer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TikTokViewer />);
  });

  it('should render a div', () => {
    expect(wrapper.find('div').length).toEqual(1);
  })

  it('should render Buttons component', () => {
    expect(wrapper.containsMatchingElement(<Buttons />)).toEqual(true)
  });

  it("runs component did mount function", () => {
    wrapper = mount(<TikTokViewer />);
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

      expect(wrapper.state('currentClip')).toEqual(2);
    });
  });
});
