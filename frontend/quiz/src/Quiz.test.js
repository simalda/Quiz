import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './Quiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


const state ={
  turnData:{
    quesion:"a",
    answer:["c","d","s"]
  },
  highlight:'none'
}


describe("Quiz", () =>{
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Quiz {...state} onAnswerSelected={()=>{}}/>, div);
  //ReactDOM.unmountComponentAtNode(div);
});
});

describe("When no answer has been selected", () =>{
  let wrapper;
  beforeAll(()=> {
    wrapper = mount(<Quiz {...state} nAnswerSelected={()=>{}}/>);
  });

  it('should have no background color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');     
  });
  });
  
describe("When the wrong answer has been selected", () =>{
  let wrapper;
  beforeAll(()=> {
    wrapper = mount(<Quiz {...(Object.assign({},state,{highlight: 'wrong'}))} nAnswerSelected={()=>{}}/>);
  });

  it('should have red background color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');     
  });
  });

describe("When the correct answer has been selected", () =>{
    let wrapper;
    beforeAll(()=> {
      wrapper = mount(<Quiz {...(Object.assign({},state,{highlight: 'correct'}))} nAnswerSelected={()=>{}}/>);
    });
  
    it('should have red background color', () => {
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');     
    });
    });

describe("When the first answer is selected", () =>{
  let wrapper;
  const handleAnswersSelecter = jest.fn();

  beforeAll(()=> {
    wrapper = mount(<Quiz {...state} onAnswerSelected={()=>{}}/>);
    wrapper.find.apply('.kAnswer').first().simulate('click');
  });

  it('onAnswerselected should be called', () => {
      expect(handleAnswersSelecter).toHaveBeenCalled();     
  });

  it("should receive c", ()=>{
    expect(handleAnswersSelecter).toHaveBeenCalledWith("c");
  })
  });
    