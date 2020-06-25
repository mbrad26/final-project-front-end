import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar />)
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
    expect(wrapper.find(Link).at(1).text()).toBe('Sign Up')
  });
});
