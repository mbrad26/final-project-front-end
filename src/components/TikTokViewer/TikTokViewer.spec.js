import React from 'react';
import { shallow } from 'enzyme';
import TikTokViewer from './TikTokViewer';
import Buttons from '../Buttons/Buttons';

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
});