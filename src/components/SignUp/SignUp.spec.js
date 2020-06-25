import React from 'react';
import { shallow } from 'enzyme';
import SignUp from './SignUp';

describe('SignUp', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUp />)
  });

  it('should render a div', () => {
    expect(wrapper.find('div').length).toEqual(1)
  });

  it('should contain a form', () => {
    expect(wrapper.find('form').length).toEqual(1)
  })

  it('has an initial state', () => {
    expect(wrapper.state('username')).toEqual('');
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
    expect(wrapper.state('password_confirmation')).toEqual('');
  });

  it('should render a input area for username', () => {
    expect(wrapper.find('input').at(0).props().name).toBe('username');
    expect(wrapper.find('input').at(0).props().placeholder).toBe('Username');
    expect(wrapper.find('input').at(0).props()).toHaveProperty('required');
  });
});
