import React from 'react';
import { shallow } from 'enzyme';
import Buttons from './Buttons';


describe('Buttons', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Buttons />);
  });

  it('should render a div', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});
