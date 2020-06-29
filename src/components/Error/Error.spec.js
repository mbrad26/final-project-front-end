import React from 'react';
import { shallow } from 'enzyme';
import Error from './Error';

describe('Error', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Error />);
  });

  it('should render a div', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render an error message', () => {
    let error = 'Nothing here for you to see!';

    expect(wrapper.find('h1').text()).toEqual(error);
  });
});
