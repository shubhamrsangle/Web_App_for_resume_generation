import React from 'react';
import BasicDetails from '../Basic/basic';
import EducationDetails from '../EducationDetails/educationDetails';
import AreasOfInterest from '../AreasOfInterest/areasofinterest';
import TechnicalProficiency from '../TechnicalProficiency/technicalproficiency';
import Publications from '../Publications/publications';
import AcademicProjects from '../AcademicProjects/academicprojects';
import Experience from '../Experience/experience';
import Courses from '../Courses/courses';
import Achievements from '../Achievements/achievements';
import PositionsOfResponsibility from '../PositionsOfResponsibility/positionsofresponsibility';
import ExtraCurricularActivities from '../ExtraCurricularActivities/extracurricularactivities';
import HobbiesAndInterests from '../HobbiesAndInterests/hobbiesandinterests';
import {Card, CardHeader, UncontrolledCollapse, CardBody} from 'reactstrap';
import axios from 'axios';

export default class Form extends React.Component {

  state = {
    basic : {},
		educationdetails : [],
		areasofinterest : [],
		technicalproficiency : [],
		publications :[],
		academicprojects : [],
		experience : [],
		courses : [],
		achievements : [],
		positionsofresponsibility: [],
		extracurricularactivities : [],
		hobbiesandinterests : []
  }

  removeFunction = (type, index) => {
    var array;
    switch(type) {
      case 0:
          array = [...this.state.academicprojects];
          array.splice(index,1);
          this.setState({academicprojects:array});
          break;
      case 1:
          array = [...this.state.achievements];
          array.splice(index,1);
          this.setState({achievements:array});
          break;
      case 2:
          array = [...this.state.areasofinterest];
          array.splice(index,1);
          this.setState({areasofinterest:array});
          break;
      case 4:
          array = [...this.state.courses];
          array.splice(index,1);
          this.setState({courses:array});
          break;
      case 5:
          array = [...this.state.educationdetails];
          array.splice(index,1);
          this.setState({educationdetails:array});
          break;
      case 6:
          array = [...this.state.experience];
          array.splice(index,1);
          this.setState({experience:array});
          break;
      case 7:
          array = [...this.state.extracurricularactivities];
          array.splice(index,1);
          this.setState({extracurricularactivities:array});
          break;
      case 8:
          array = [...this.state.hobbiesandinterests];
          array.splice(index,1);
          this.setState({hobbiesandinterests:array});
          break;
      case 9:
          array = [...this.state.positionsofresponsibility];
          array.splice(index,1);
          this.setState({positionsofresponsibility:array});
          break;
      case 10:
          array = [...this.state.publications];
          array.splice(index,1);
          this.setState({publications:array});
          break;
      case 11:
          array = [...this.state.technicalproficiency];
          array.splice(index,1);
          this.setState({technicalproficiency:array});
          break;
      default: console.log("Not Defined");
    }
  }

  editFunction = (type, index, data) => {
    var array;
    switch(type) {
      case 0:
          array = [...this.state.academicprojects];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({academicprojects:array});
          break;
      case 1:
          array = [...this.state.achievements];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({achievements:array});
          break;
      case 2:
          array = [...this.state.areasofinterest];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({areasofinterest:array});
          break;
      case 4:
          array = [...this.state.courses];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({courses:array});
          break;
      case 5:
          array = [...this.state.educationdetails];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({educationdetails:array});
          break;
      case 6:
          array = [...this.state.experience];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({experience:array});
          break;
      case 7:
          array = [...this.state.extracurricularactivities];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({extracurricularactivities:array});
          break;
      case 8:
          array = [...this.state.hobbiesandinterests];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({hobbiesandinterests:array});
          break;
      case 9:
          array = [...this.state.positionsofresponsibility];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({positionsofresponsibility:array});
          break;
      case 10:
          array = [...this.state.publications];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({publications:array});
          break;
      case 11:
          array = [...this.state.technicalproficiency];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({technicalproficiency:array});
          break;
      default: console.log("Not Defined");
    }
  }

  submitHandler = (type, data) => {
    switch(type) {
      case 0:
          this.setState({academicprojects: [...this.state.academicprojects, data]});
          break;
      case 1:
          this.setState({achievements: [...this.state.achievements, data]});
          break;
      case 2:
          this.setState({areasofinterest: [...this.state.areasofinterest, data]});
          break;
      case 3:
          this.setState({basic: data});
          break;
      case 4:
          this.setState({courses: [...this.state.courses, data]});
          break;
      case 5:
          this.setState({educationdetails: [...this.state.educationdetails, data]});
          break;
      case 6:
          this.setState({experience: [...this.state.experience, data]});
          break;
      case 7:
          this.setState({extracurricularactivities: [...this.state.extracurricularactivities, data]});
          break;
      case 8:
          this.setState({hobbiesandinterests: [...this.state.hobbiesandinterests, data]});
          break;
      case 9:
          this.setState({positionsofresponsibility: [...this.state.positionsofresponsibility, data]});
          break;
      case 10:
          this.setState({publications: [...this.state.publications, data]});
          break;
      case 11:
          this.setState({technicalproficiency: [...this.state.technicalproficiency, data]});
          break;
      default: console.log("Not Defined");
    }
  }


  //Final Submit Function
  finalSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
		alert('Check console to see the submitted data using ctrl + shift + i ....');
		axios.post('http://localhost:4000/serverport',this.state )
          .then(res => {
          	if(res.data)
          	{
          		window.open('http://localhost:4000/serverport');
          	}
          	else
          	{
          		alert('Resource is Busy!!!Try After Sometimes...');
          	}
          });
	}

  render() {
    return(
      <React.Fragment>
      <Card>
        <CardHeader>
        <button className="btn btn-link" id="basic">Basic Details</button>
        </CardHeader>
        <UncontrolledCollapse toggler="#basic"><CardBody>
              <BasicDetails fields={this.state.basic} submit={this.submitHandler}/>
          </CardBody></UncontrolledCollapse>
        </Card>

        <EducationDetails fields={this.state.educationdetails} submit={this.submitHandler} removeFunc={this.removeFunction} editFunc={this.editFunction}/>
        <AreasOfInterest fields={this.state.areasofinterest} submit={this.submitHandler} removeFunc={this.removeFunction} editFunc={this.editFunction}/>
        <TechnicalProficiency fields={this.state.technicalproficiency} submit={this.submitHandler} removeFunc={this.removeFunction} editFunc={this.editFunction}/>
        <Publications fields={this.state.publications} submit={this.submitHandler} removeFunc={this.removeFunction} editFunc={this.editFunction}/>
        <AcademicProjects fields={this.state.academicprojects} submit={this.submitHandler} removeFunc={this.removeFunction} editFunc={this.editFunction}/>
        <Experience fields={this.state.experience} submit={this.submitHandler} removeFunc={this.removeFunction} editFunc={this.editFunction}/>
        <Courses fields={this.state.courses} submit={this.submitHandler} removeFunc={this.removeFunction} editFunc={this.editFunction}/>
        <Achievements fields={this.state.achievements} submit={this.submitHandler} removeFunc={this.removeFunction} editFunc={this.editFunction}/>
        <PositionsOfResponsibility fields={this.state.positionsofresponsibility} submit={this.submitHandler} removeFunc={this.removeFunction} editFunc={this.editFunction}/>
        <ExtraCurricularActivities fields={this.state.extracurricularactivities} submit={this.submitHandler} removeFunc={this.removeFunction} editFunc={this.editFunction}/>
        <HobbiesAndInterests fields={this.state.hobbiesandinterests} submit={this.submitHandler} removeFunc={this.removeFunction} editFunc={this.editFunction}/>


        <button onClick={this.finalSubmit}>Submit</button>
      </React.Fragment>
    );
  }
}
