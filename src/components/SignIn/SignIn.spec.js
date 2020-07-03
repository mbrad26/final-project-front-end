import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import SignIn from "./SignIn";
import * as axios from "axios";
import { createMemoryHistory } from "history";

jest.mock("axios");

describe("Sign", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignIn />);
  });

  it("should render a div", () => {
    expect(wrapper.find("div.form-container").length).toEqual(1);
  });

  it("should contain a form", () => {
    expect(wrapper.find("form").length).toEqual(1);
  });

  it("has an initial state", () => {
    expect(wrapper.state("username")).toEqual("");
    expect(wrapper.state("password")).toEqual("");
  });

  it("should render a input area for username", () => {
    expect(wrapper.find("input").at(0).props().type).toBe("text");
    expect(wrapper.find("input").at(0).props().value).toBe("");
    expect(wrapper.find("input").at(0).props().name).toBe("username");
    expect(wrapper.find("input").at(0).props().placeholder).toBe("Username");
    expect(wrapper.find("input").at(0).props()).toHaveProperty("required");
  });

  it("should render a input area for password", () => {
    expect(wrapper.find("input").at(1).props().type).toBe("password");
    expect(wrapper.find("input").at(1).props().value).toBe("");
    expect(wrapper.find("input").at(1).props().minLength).toBe("6");
    expect(wrapper.find("input").at(1).props().name).toBe("password");
    expect(wrapper.find("input").at(1).props().placeholder).toBe("Password");
    expect(wrapper.find("input").at(1).props()).toHaveProperty("required");
  });

  it("should render a submit button", () => {
    expect(wrapper.find("button").props().type).toBe("submit");
    expect(wrapper.find("button").props().id).toBe("signin");
    expect(wrapper.find("button").text()).toBe("Sign In");
  });

  describe("#handleChange", () => {
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

      for (let i = 0; i < 2; i++) {
        wrapper.find("input").at(i).simulate("change", mockEvent);
        expect(spy).toHaveBeenCalledWith(mockEvent);
      }

      expect(spy).toHaveBeenCalledTimes(2);
    });

    it("updates the state with event value", () => {
      wrapper.find("input").forEach((item, i) => {
        let name = `${item.props().name}`;
        let value = "changedvalue";

        item.simulate("change", { target: { name, value } });

        expect(wrapper.find("input").at(i).props().value).toEqual(
          "changedvalue"
        );
      });
    });
  });
});

describe("#handleSubmit", () => {
  let wrapper;
  let event;
  let propsTest;

  beforeEach(() => {
    event = { preventDefault: jest.fn() };
    propsTest = {
      handleUserLogInStatus: jest.fn(),
      history: createMemoryHistory("/"),
    };
    wrapper = mount(<SignIn {...propsTest} />);
    jest.clearAllMocks();
  });

  it("should be called when form is being submited", () => {
    const spy = jest.spyOn(wrapper.instance(), "handleSubmit");
    wrapper.instance().forceUpdate(); //force re-render
    // wrapper.setState({}) //force re-render
    expect(spy).toHaveBeenCalledTimes(0);

    wrapper.find("button").simulate("submit", event);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should make a POST request to the back-end", () => {
    const mockData = { status: 200 };

    wrapper.find("button").simulate("submit", event);
    axios.post.mockResolvedValue({ data: { mockData } });

    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it("should prevent form default action", () => {
    const spy = jest.spyOn(event, "preventDefault");

    wrapper.instance().handleSubmit(event);

    expect(spy).toHaveBeenCalled();
  });

  describe("when signin unsuccessful", () => {
    it("should render '/'", async () => {
      const errorMessage = new Error("Sign In failed!");
      jest.spyOn(axios, "post").mockRejectedValue(errorMessage);

      wrapper.instance().handleSubmit(event);

      await expect(axios.post()).rejects.toThrow(errorMessage);
    });
  });

  describe("when signin successful", () => {
    it("should redirect to '/account'", async () => {
      let data = { status: 200 };
      let then = jest.fn();

      await axios.post.mockImplementationOnce(() =>
        Promise.resolve({ data: data })
      );

      wrapper
        .instance()
        .handleSubmit(event)
        .then((response) => {
          expect(propsTest.history.location.pathname).toContain("/account");
          expect(propsTest.handleUserLogInStatus).toHaveBeenCalledWith(true);
        });
    });
  });
});
