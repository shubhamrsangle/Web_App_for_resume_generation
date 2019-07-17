import React from 'react';
import BasicDetails from '../Basic/basic';
import EducationDetails from '../EducationDetails/educationDetails';
import {UncontrolledCollapse,Button, CardBody, Card, CardHeader} from 'reactstrap';

export default class Form extends React.Component {

  state = {
    basicAddState: true,
    eduFields: [],
    basicDetails: []
  }


  removeFunc = (index) => {
    var array = [...this.state.eduFields];
    array.splice(index,1);
    this.setState({eduFields:array});
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
      <Card>
        <CardHeader>
        <button className="btn btn-link" id="basicDetails">Basic Details</button>
        </CardHeader>
        <UncontrolledCollapse toggler="#basicDetails"><CardBody>
              <BasicDetails fields={this.state.basicDetails} addState={this.state.basicAddState} submit={this.basicSubmitHandler}/>
            </CardBody></UncontrolledCollapse>
        </Card>

        <Card>
          <CardHeader>
          <button className="btn btn-link" id="eduDetails">Education Details</button>
          </CardHeader>
          <UncontrolledCollapse toggler="#eduDetails"><CardBody>
                <EducationDetails fields={this.state.eduFields} submit={this.eduSubmitHandler} removeFunc={this.removeFunc}/>
              </CardBody></UncontrolledCollapse>
          </Card>
        <button onClick={this.func}>Submit</button>
      </React.Fragment>
    );
  }
}
