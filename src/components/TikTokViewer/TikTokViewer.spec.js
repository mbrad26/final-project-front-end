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

  describe('handleNext Function', () => {

    it('should change the component state', () => {

      wrapper.setState({
            playlist: [
    'https://www.tiktok.com/@lzz03/video/6840824663585639686',
    'https://www.tiktok.com/@pegleg89/video/6825998203897285893',
    'https://www.tiktok.com/@bboyrockbittu/video/6840874385415343361',
    'https://www.tiktok.com/@itsoraida/video/6841342984550731014',
    'https://www.tiktok.com/@pinknews/video/6841577503472061702'
    ],
        title: 'Blinding Lights Challenge',
        url: 'http://example.com/tiktoker1',
        currentClip: 1
      });

      const instance = wrapper.instance();

      instance.handleNext();

      // expect(wrapper.state('title')).not.toEqual('Blinding Lights Challenge');
      // expect(wrapper.state('url')).not.toEqual('http://example.com/tiktoker1');
      // expect(wrapper.state('title')).toEqual('❤️❤️#viral #goviral #tiktokindia #trending');
      expect(wrapper.state('currentClip')).toEqual(2);

    });

  });
});
