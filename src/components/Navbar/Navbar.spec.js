import React from 'react';
import { shallow, mount } from 'enzyme';
import Navbar from './Navbar';

describe('Navbar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar />)
  });

  it('should render a nav', () => {
    expect(wrapper.find('nav').length).toEqual(1);
  });
});
