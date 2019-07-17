import React from 'react';
import BasicDetails from '../Basic/basic';
import EducationDetails from '../EducationDetails/educationDetails';

export default class Form extends React.Component {

  state = {
    basicAddState: true,
    eduAddState: true,
    eduFields: [],
    basicDetails: []
  }

  //Toggler for education details
  eduToggle = () => {
    this.setState({
      eduAddState: !this.state.eduAddState
    });
  }

  //Toggle function template for functions
/*  toggle = () => {
    this.setState({
      addState: !this.state.addState
    });
  }
*/

  //submit handler for insititute details
  eduSubmitHandler = (data) => {
    this.setState({
      eduFields: [...this.state.eduFields, data],
      eduAddState: false
    });
  }

  //submit handler for basic details
  basicSubmitHandler = (data) => {
    this.setState({basicDetails: data,
    basicAddState:false});
  }

  //submit function templates
/*  submitHandler = (data) =>
    this.setState({
      nandhas: [...this.state.nandhas, data],
      addState: false
    });
  }*/


  //Final Submit Function
  func = (event) => {
    event.preventDefault();
    console.log(this.state);
    window.alert("Done");
  }

  render() {
    return(
      <React.Fragment>
        <BasicDetails fields={this.state.basicDetails} addState={this.state.basicAddState} submit={this.basicSubmitHandler}/>
        <EducationDetails fields={this.state.eduFields} addState={this.state.eduAddState} toggle={this.eduToggle} submit={this.eduSubmitHandler}/>
        <button onClick={this.func}>Submit</button>
      </React.Fragment>
    );
  }
}
