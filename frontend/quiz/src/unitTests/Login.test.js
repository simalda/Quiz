import React from "react";
import ReactDOM from "react-dom";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LogInPage from "../components/LogInPage";
import pages from "../JS/pages";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});
Enzyme.configure({ adapter: new Adapter() });

const state = {
  quiz: [
    {
      question: "a",
      answer: ["c", "d", "s"],
      correctAnswer: "cor"
    },
    {
      question: "ab",
      answer: ["c", "d", "s"],
      correctAnswer: "cor2"
    }
  ],
  highlight: "none",
  page: pages.Login,
  answerOptions: []
};

describe.skip("Login", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(
      <Provider store={store}>
        <LogInPage submit={mockSubmit} />
      </Provider>
    );
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("State page is correct", () => {
    expect(state.page).toBe(pages.Login);
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<LogInPage {...state} />, div);
  });

  it("should show text", () => {
    const text = wrapper.find({ id: "guest" });
    expect(text.text()).toBe("LOGIN AS GUEST");
  });

  it("should find one button for guest", () => {
    const button = wrapper.find({ id: "guest" });
    expect(button).toHaveLength(1);
  });
});

/*------------------------------------------------------------------------------------*/

// describe("When the enter as a guest selected", () =>{
//   let wrapper;
//   const handleEnterAsGuestSelecter = jest.fn();

//   beforeAll(()=> {
//     wrapper = mount(<LogInPage {...state} onEnterAsaGuestSelected={()=>{}}/>);
//     wrapper.find.apply({ id: "guest" }).first().simulate('click');
//   });

//   it('onEnterAsaGuestSelected should be called', () => {
//       expect(handleEnterAsGuestSelecter).toHaveBeenCalled();
//   });

//   it("should receive c", ()=>{
//     expect(handleEnterAsGuestSelecter).toHaveBeenCalledWith("c");
//   })
//   });

// it('should have no background color', () => {
//   expect(wrapper.find({id: "username"}).props().style.backgroundColor).toBe('white');
// });
