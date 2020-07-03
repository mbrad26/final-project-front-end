import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import TikTokViewer from '../TikTokViewer/TikTokViewer';
import Navbar from '../Navbar/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn.jsx';
import Error from '../Error/Error.jsx';
import EditPlaylist from "../EditPlaylist/EditPlaylist.jsx";
import * as axios from "axios";

jest.mock("axios");

describe('App', () => {
  let wrapper;
  let propsTest;

  beforeEach(() => {
    propsTest = {
      userLogInStatus: false,
      user: {},
    }
    wrapper = shallow(<App {...propsTest}/>);
  });

  it("should render a div", () => {
    expect(wrapper.find("div.container").length).toEqual(1);
  });

  it('has an initial state', () => {
    expect(wrapper.state('userLogInStatus')).toEqual(false);
    expect(wrapper.state('user')).toEqual({});
  });

  it('sends the correct props to the Navbar component', () => {
    wrapper.setState(propsTest);

    expect(wrapper.find(Navbar).props().userLogInStatus).toBe(propsTest.userLogInStatus);
    expect(wrapper.find(Navbar).props().user).toBe(propsTest.user);
  });

  it('sends the correct props to the SignIn component', () => {
    wrapper = mount(<App />);
    wrapper.setState(propsTest);

    expect(wrapper.find(Route).at(1).find(SignIn).props().handleUserLogInStatus).toBe(wrapper.instance().handleUserLogInStatus);
  });

  it('should render Navbar component', () => {
    expect(wrapper.containsMatchingElement(<Navbar />)).toEqual(true);
  });

  describe('#handleUserLogInStatus', () => {
    describe('when false', () => {
      it('makes an api request', () => {
        let bool = false;
        wrapper.instance().handleUserLogInStatus(bool);

        expect(axios.delete).toHaveBeenCalled();
      });

      // it('sets the userLogInStatus to false', () => {
      //   let bool = false;
      //   // wrapper = mount(<App />);
      //   wrapper.instance().handleUserLogInStatus(bool);
      //
      //   jest.spyOn(axios, 'delete').mockResolvedValue(() => {});
      //
      //   expect(wrapper.instance().state.userLogInStatus).toEqual(false);
      // });
    });

    describe('when true', () => {
      it('sets the userLogInStatus to true', () => {
        let bool = true;
        wrapper.instance().handleUserLogInStatus(bool);

        expect(wrapper.instance().state.userLogInStatus).toEqual(true);
      });
    });
  });
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


  it("should render SignUp component", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/signup"]}>
        <Route path="/signup" render={(props) => (
          <SignUp
            {...props}
            handleUserLogInStatus={App.prototype.handleUserLogInStatus}
          />
        )} />
      </MemoryRouter>
    );

    expect(wrapper.containsMatchingElement(<SignUp />)).toEqual(true);
  });

  it('should render Error component', () => {
    const wrapper = mount(
                  <MemoryRouter>
                    <Route component={Error} />
                  </MemoryRouter>
                );

    expect(wrapper.containsMatchingElement(<Error />)).toEqual(true);
  });

  it('should render EditPlaylist component', () => {
    const wrapper = mount(
                  <MemoryRouter initialEntries={["/editPlaylist/:uuid"]}>
                    <Route
                      path="/editPlaylist/:uuid"
                      exact
                      render={(props) => <EditPlaylist {...props} />}
                    />
                  </MemoryRouter>
                );
    expect(wrapper.containsMatchingElement(<EditPlaylist />)).toEqual(true);
  })
});
