import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import TikTokViewer from '../TikTokViewer/TikTokViewer';
import Navbar from '../Navbar/Navbar';

describe('App', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render a div', () => {
    expect(wrapper.find('div.app-container').length).toEqual(1);
  });

  it('should render TikTok component', () => {
    expect(wrapper.containsMatchingElement(<TikTokViewer />)).toEqual(true);
  });

  it('should render Navbar component', () => {
    expect(wrapper.containsMatchingElement(<Navbar />)).toEqual(true);
  })
});
