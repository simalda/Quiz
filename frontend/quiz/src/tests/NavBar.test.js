import React from "react";
import ReactDOM from "react-dom";

import Enzyme, { mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import pages from "../pages";
import modalKinds from "../ModlKind";
import NavBar from "../components/NavBar";
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

describe("NavBar", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(<NavBar submit={mockSubmit} />);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

   

  it('should show text', ()=>{
    const text = wrapper.find({ id: "aboutUs" });
    expect(text.text()).toBe("About Us");
  })

  it('should find one button for about us', () => {     
    const butto = wrapper.find({id: "aboutUs"})
       expect(butto).toHaveLength(1);
        });  

 
});

