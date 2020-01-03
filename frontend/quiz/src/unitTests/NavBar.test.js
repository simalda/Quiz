import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyeme-adapter-react-16";

import NavBar from "../components/NavBar";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});
Enzyme.configure({ adapter: new Adapter() });

describe.skip("NavBar", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(
      <Provider store={store}>
        <NavBar submit={mockSubmit} />
      </Provider>
    );
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should show text", () => {
    const text = wrapper.find({ id: "aboutUs" });
    expect(text.text()).toBe("About Us");
  });

  it("should find one button for about us", () => {
    const button = wrapper.find({ id: "aboutUs" });
    expect(button).toHaveLength(1);
  });
});
