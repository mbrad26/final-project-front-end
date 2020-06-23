import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import TikTokViewer from '../TikTokViewer/TikTokViewer';

describe('App', () => {

  it('should render a div', () => {
    let wrapper = shallow(<App />);
    expect(wrapper.find('div.App').length).toEqual(1);
  });

  it('should render TikTok component', () => {
    let wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<TikTokViewer />)).toEqual(true);
  });
});
