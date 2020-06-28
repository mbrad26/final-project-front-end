import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import TikTokViewer from '../TikTokViewer/TikTokViewer';
import Navbar from '../Navbar/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn.jsx';

describe('App', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render a div', () => {
    expect(wrapper.find('div.app-container').length).toEqual(1);
  });

  it('has an initial state', () => {
    expect(wrapper.state('userLogInStatus')).toEqual(false);
    expect(wrapper.state('user')).toEqual({});
  });

  it('sends the correct props to the Navbar component', () => {
    const propsTest = {
      userLogInStatus: false,
      user: {},
    }
    wrapper.setState(propsTest);

    expect(wrapper.find(Navbar).props().userLogInStatus).toBe(propsTest.userLogInStatus);
    expect(wrapper.find(Navbar).props().user).toBe(propsTest.user);
  });

  it('sends the correct props to the SignIn component', () => {
    wrapper = mount(<App />);
    const propsTest = {
      userLogInStatus: false,
      user: {},
    }
    wrapper.setState(propsTest);

    expect(wrapper.find(Route).at(0).find(SignIn).props().userLogInStatus).toBe(propsTest.userLogInStatus);
  });

  it('should render Navbar component', () => {
    expect(wrapper.containsMatchingElement(<Navbar />)).toEqual(true);
  })
});

describe('Mounted App', () => {
  it('should render SignIn component', () => {
    const wrapper = mount(
                  <MemoryRouter initialEntries={[ '/' ]}>
                    <App />
                  </MemoryRouter>
                );
    expect(wrapper.containsMatchingElement(<SignIn />)).toEqual(true);
  })

  it('should render SignUp component', () => {
    const wrapper = mount(
                  <MemoryRouter initialEntries={[ '/signup' ]}>
                    <Route path='/signup' component={SignUp} />
                  </MemoryRouter>
                );

    expect(wrapper.containsMatchingElement(<SignUp />)).toEqual(true)
  });
});
