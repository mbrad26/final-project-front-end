import React from 'react';
import { shallow } from 'enzyme';
import TikTokViewer from './TikTokViewer';

describe('TikTokViewer', () => {

  it('should render a div', () => {
    let wrapper = shallow(<TikTokViewer />);
    expect(wrapper.find('div').length).toEqual(1);
  });

});