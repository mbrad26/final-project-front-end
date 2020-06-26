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

  it('should render a previous button', () => {
    expect(wrapper.find('button.previous').length).toEqual(1);
  })

  it('should render a next button', () => {
    expect(wrapper.find('button.next').length).toEqual(1);
  })

  it('calls handleNext when button is clicked', () => {
    const baseProps = {
       handleNext: jest.fn(),
     };
    const wrapper = shallow(<Buttons {...baseProps} />);

    wrapper.find('.next').first().simulate('click');

    expect(baseProps.handleNext).toHaveBeenCalledTimes(1);
  });

  it('calls handlePrevious when button is clicked', () => {
    const baseProps = {
       handlePrevious: jest.fn(),
     };
    const wrapper = shallow(<Buttons {...baseProps} />);

    wrapper.find('.previous').first().simulate('click');

    expect(baseProps.handlePrevious).toHaveBeenCalledTimes(1);
  });
});
