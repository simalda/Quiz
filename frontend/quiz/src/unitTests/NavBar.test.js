import React from "react";

import Enzyme, {  shallow } from "enzyme";
import Adapter from "enzyeme-adapter-react-16";

import NavBar from "../components/NavBar";
Enzyme.configure({ adapter: new Adapter() });

 
 

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

