import React from 'react';
import { shallow } from 'enzyme';
import TikTokViewer from './TikTokViewer';

describe('TikTokViewer', () => {
  let wrapper; 

  beforeEach(() => { 
    wrapper = shallow(<TikTokViewer />);
  });

  it('should render a div', () => {
    expect(wrapper.find('div').length).toEqual(1);
  })

  it('should render a button', () => {
    expect(wrapper.find('button.previous').length).toEqual(1);
  })

  it('should render a button', () => {
    expect(wrapper.find('button.next').length).toEqual(1);
  })
});