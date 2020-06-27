import React from 'react';
import { shallow, mount } from 'enzyme';
import { Redirect } from 'react-router-dom';
import SignIn from './SignIn';
import * as axios from 'axios';

jest.mock('axios');

describe('Sign', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignIn />)
  });

  it('should render a div', () => {
    expect(wrapper.find('div').length).toEqual(1)
  });

  it('should contain a form', () => {
    expect(wrapper.find('form').length).toEqual(1)
  })

  it('has an initial state', () => {
    expect(wrapper.state('username')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
  });

  it('should render a input area for username', () => {
    expect(wrapper.find('input').at(0).props().type).toBe('text');
    expect(wrapper.find('input').at(0).props().value).toBe('')
    expect(wrapper.find('input').at(0).props().name).toBe('username');
    expect(wrapper.find('input').at(0).props().placeholder).toBe('Username');
    expect(wrapper.find('input').at(0).props()).toHaveProperty('required');
  });

  it('should render a input area for password', () => {
    expect(wrapper.find('input').at(1).props().type).toBe('password');
    expect(wrapper.find('input').at(1).props().value).toBe('')
    expect(wrapper.find('input').at(1).props().minLength).toBe("6");
    expect(wrapper.find('input').at(1).props().name).toBe('password');
    expect(wrapper.find('input').at(1).props().placeholder).toBe('Password');
    expect(wrapper.find('input').at(1).props()).toHaveProperty('required');
  });


  describe('#handleChange', () => {
    let mockEvent;

    beforeEach(() => {
      mockEvent = {
        target: {
          value: 'changedvalue',
        }
      };
    });

    it('should be called when a change is detected', () => {
      const spy = jest.spyOn(wrapper.instance(), 'handleChange');
      wrapper.instance().forceUpdate();
      expect(spy).toHaveBeenCalledTimes(0);

      for(let i=0; i<2; i++) {
        wrapper.find('input').at(i).simulate('change', mockEvent);
        expect(spy).toHaveBeenCalledWith(mockEvent);
      }

      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('updates the state with event value', () => {
      for(let i=0; i<2; i++) {
        let input = wrapper.find('input').at(i)
        input.simulate('change', mockEvent)

        input = wrapper.find('input').at(i)

        expect(input.props().value).toEqual('changedvalue');
      }
    });
  });
});

describe('#handleSubmit', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SignIn />);
  });

  it('should be called when form is being submited', () => {
    const event = { preventDefault: jest.fn() }
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit')
    wrapper.instance().forceUpdate(); //force re-render
    // wrapper.setState({}) //force re-render
    expect(spy).toHaveBeenCalledTimes(0);

    wrapper.find('button').simulate('submit', event);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should make a POST request to the back-end', () => {
    const event = { preventDefault: jest.fn() }
    const mockData = {
      "status": "SUCCESS",
      "user": {
        "username": "JOHN1000",
        "password": "password",
      }
    }

    wrapper.find('button').simulate('submit', event);

    axios.post.mockResolvedValue({ data: { mockData } });

    expect(axios.post).toHaveBeenCalled();
  });

  it('should prevent form default action', () => {
    const event = { preventDefault: () => {} }
    const spy = jest.spyOn(event, 'preventDefault')

    wrapper.instance().handleSubmit(event)

    expect(spy).toHaveBeenCalled();
  });

  describe('when signin unsuccessful', () => {
    it("should render '/'", () => {
      axios.post.mockImplementationOnce(() => Promise.resolve({ status: 'ERROR' }));

      expect(wrapper.containsMatchingElement(<Redirect to={'/'} />)).toEqual(false)
    });
  });

  // describe('when signup successful', () => {
  //   it("should redirect to '/account'", () => {
  //     axios.post.mockImplementationOnce(() => Promise.resolve({ status: 'SUCCESS' }));
  //
  //     expect(wrapper.containsMatchingElement(<Redirect to={'/account'} />)).toEqual(true)
  //   });
  // });
});
