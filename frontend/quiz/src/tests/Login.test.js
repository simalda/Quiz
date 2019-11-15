import React from "react";
import ReactDOM from "react-dom";

import Enzyme, { mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LogInPage from "../components/LogInPage";
import pages from "../pages";
import modalKinds from "../ModlKind";
Enzyme.configure({ adapter: new Adapter() });

 
const state ={
  quiz:[{
    quesion:"a",
    answer:["c","d","s"],
    correctAnswer: "cor"
  },
  {
    quesion:"ab",
    answer:["c","d","s"],
    orrectAnswer: "cor2"
  }],
  highlight:'none',
  page:pages.Login,
  answerOptions:[]
}

describe("Login", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(<LogInPage submit={mockSubmit} />);
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

  it('should show text', ()=>{
    const text = wrapper.find({ id: "guest" });
    expect(text.text()).toBe("LOGIN AS GUEST");
  })

  it('should find one button for guest', () => {     
    const butto = wrapper.find({id: "guest"})
       expect(butto).toHaveLength(1);
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