import React from 'react';
import { Redirect, BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import SignUp from './SignUp';
import * as axios from 'axios';

jest.mock('axios');

describe('SignUp', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUp />);
    jest.clearAllMocks();
  });

  it('should render a div', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should contain a form', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('has an initial state', () => {
    expect(wrapper.state('username')).toEqual('');
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
    expect(wrapper.state('password_confirmation')).toEqual('');
  });

  it('should render a input area for username', () => {
    expect(wrapper.find('input').at(0).props().type).toBe('text');
    expect(wrapper.find('input').at(0).props().value).toBe('');
    expect(wrapper.find('input').at(0).props().name).toBe('username');
    expect(wrapper.find('input').at(0).props().placeholder).toBe('Username');
    expect(wrapper.find('input').at(0).props()).toHaveProperty('required');
  });

  it('should render a input area for email', () => {
    expect(wrapper.find('input').at(1).props().type).toBe('email');
    expect(wrapper.find('input').at(1).props().value).toBe('');
    expect(wrapper.find('input').at(1).props().name).toBe('email');
    expect(wrapper.find('input').at(1).props().placeholder).toBe('Email');
    expect(wrapper.find('input').at(1).props()).toHaveProperty('required');
  });

  it('should render a input area for password', () => {
    expect(wrapper.find('input').at(2).props().type).toBe('password');
    expect(wrapper.find('input').at(2).props().value).toBe('');
    expect(wrapper.find('input').at(2).props().minLength).toBe("6");
    expect(wrapper.find('input').at(2).props().name).toBe('password');
    expect(wrapper.find('input').at(2).props().placeholder).toBe('Password');
    expect(wrapper.find('input').at(2).props()).toHaveProperty('required');
  });

  it('should render a input area for password confirmation', () => {
    expect(wrapper.find('input').at(3).props().type).toBe('password');
    expect(wrapper.find('input').at(3).props().value).toBe('');
    expect(wrapper.find('input').at(3).props().minLength).toBe("6");
    expect(wrapper.find('input').at(3).props().name).toBe('password_confirmation');
    expect(wrapper.find('input').at(3).props().placeholder).toBe('Password Confirmation');
    expect(wrapper.find('input').at(3).props()).toHaveProperty('required');
  });

  it('should render a submit button', () => {
    expect(wrapper.find('button').props().type).toBe('submit');
    expect(wrapper.find('button').props().className).toBe('signup');
    expect(wrapper.find('button').text()).toBe('Sign Up');
  });

  describe('#handleChange', () => {
    let mockEvent;

    beforeEach(() => {
      mockEvent = {
        target: {
          value: 'changedvalue',
        },
      };
    });

    it('should be called when a change is detected', () => {
      const spy = jest.spyOn(wrapper.instance(), 'handleChange');
      wrapper.instance().forceUpdate();
      expect(spy).toHaveBeenCalledTimes(0);

      for(let i=0; i<4; i++) {
        wrapper.find('input').at(i).simulate('change', mockEvent);
        expect(spy).toHaveBeenCalledWith(mockEvent);
      }

      expect(spy).toHaveBeenCalledTimes(4);
    });

    it('updates the state with event value', () => {
      for(let i=0; i<4; i++) {
        let input = wrapper.find('input').at(i);
        input.simulate('change', mockEvent);

        input = wrapper.find('input').at(i);

        expect(input.props().value).toEqual('changedvalue');
      }
    });
  });
});

describe('#handleSubmit', () => {
  let wrapper;
  let event;

  beforeEach(() => {
    event = { preventDefault: jest.fn() };
    wrapper = mount(<SignUp />);
    jest.clearAllMocks();
  });

  it('should be called when form is being submited', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().forceUpdate(); //force re-render
    // wrapper.setState({}) //force re-render
    expect(spy).toHaveBeenCalledTimes(0);

    wrapper.find('button').simulate('submit', event);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should make a POST request to the back-end', () => {
    const mockData = { "status": 200, };
    const mockAxios = axios.post.mockResolvedValue({ data: { mockData } });

    wrapper.find('button').simulate('submit', event);

    expect(mockAxios).toHaveBeenCalledTimes(1);
  });

  it('should prevent form default action', () => {
    const spy = jest.spyOn(event, 'preventDefault');

    wrapper.instance().handleSubmit(event);

    expect(spy).toHaveBeenCalled();
  });

  describe('when signup unsuccessful', () => {
    it("should render '/signup'", () => {
      expect(wrapper.containsMatchingElement(<Redirect to={'/'} />)).toEqual(false);
    });
  });

  describe('when signup successful', () => {
    it("should redirect to '/'", () => {
      wrapper.setState({ redirect: '/' });

      expect(wrapper.containsMatchingElement(
        <Router>
          <Redirect to={'/'} />
        </Router>
      )).toEqual(true);
    });
  });
});
