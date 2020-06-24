import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import TikTokViewer from '../TikTokViewer/TikTokViewer';

describe('App', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render a div', () => {
    expect(wrapper.find('div.App').length).toEqual(1);
  });

  it('should render TikTok component', () => {
    expect(wrapper.containsMatchingElement(<TikTokViewer />)).toEqual(true);
  });
});
