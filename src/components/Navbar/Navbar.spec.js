import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  let wrapper;
  let propsTest;

  beforeEach(() => {
    propsTest = {
      userLogInStatus: false,
    };
    wrapper = shallow(<Navbar {...propsTest} />);
  });

  it('should render a nav', () => {
    expect(wrapper.find('nav').length).toEqual(1);
  });

  it('should have a Home link', () => {
    expect(wrapper.find(Link).at(0).props().to).toBe('/');
    expect(wrapper.find(Link).at(0).text()).toBe('Home');
  });

  it('should have a Sign Up link', () => {
    expect(wrapper.find(Link).at(1).props().to).toBe('/signup');
    expect(wrapper.find(Link).at(1).props().id).toBe('register-account')
    expect(wrapper.find(Link).at(1).text()).toBe('Sign Up')
  });

  describe('when user has signed in', () => {
    it('should have a Sign Out link', () => {
      propsTest.userLogInStatus = true
      wrapper = shallow(<Navbar {...propsTest} />);

      expect(wrapper.find(Link).at(1).props().to).toBe('/');
      expect(wrapper.find(Link).at(1).text()).toBe('Sign Out');
    });
  });
});
