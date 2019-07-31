import React from 'react';
import BasicDetails from '../Basic/basic';
import EducationDetails from '../EducationDetails/educationdetails';
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
import uuid from "uuid";

export default class Form extends React.Component {

  constructor(props) {
    if(!localStorage.getItem("photoName")){
      localStorage.setItem("photoName",uuid());
    }
    super(props);

    this.state = {
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
      hobbiesandinterests : [],
			imageUploading: false
      }
    //----------------------------------------------------------//
    const basicLocal = JSON.parse(localStorage.getItem('basic'));
    if(basicLocal)
      this.state.basic = basicLocal;
    //----------------------------------------------------------//
    //----------------------------------------------------------//
    const educationdetailsLocal = JSON.parse(localStorage.getItem('educationdetails'));
    if(educationdetailsLocal)
      this.state.educationdetails = educationdetailsLocal;
    //----------------------------------------------------------//
    //----------------------------------------------------------//
    const areasofinterestLocal = JSON.parse(localStorage.getItem('areasofinterest'));
    if(areasofinterestLocal)
      this.state.areasofinterest = areasofinterestLocal;
    //----------------------------------------------------------//
    //----------------------------------------------------------//
    const technicalproficiencyLocal = JSON.parse(localStorage.getItem('technicalproficiency'));
    if(technicalproficiencyLocal)
      this.state.technicalproficiency = technicalproficiencyLocal;
    //----------------------------------------------------------//
    //----------------------------------------------------------//
    const publicationsLocal = JSON.parse(localStorage.getItem('publications'));
    if(publicationsLocal)
      this.state.publications = publicationsLocal;
    //----------------------------------------------------------//
    //----------------------------------------------------------//
    const academicprojectsLocal = JSON.parse(localStorage.getItem('academicprojects'));
    if(academicprojectsLocal)
      this.state.academicprojects = academicprojectsLocal;
    //----------------------------------------------------------//
    //----------------------------------------------------------//
    const experienceLocal = JSON.parse(localStorage.getItem('experience'));
    if(experienceLocal)
      this.state.experience = experienceLocal;
    //----------------------------------------------------------//
    //----------------------------------------------------------//
    const coursesLocal = JSON.parse(localStorage.getItem('courses'));
    if(coursesLocal)
      this.state.courses = coursesLocal;
    //----------------------------------------------------------//
    //----------------------------------------------------------//
    const achievementsLocal = JSON.parse(localStorage.getItem('achievements'));
    if(achievementsLocal)
      this.state.achievements = achievementsLocal;
    //----------------------------------------------------------//
    //----------------------------------------------------------//
    const positionsofresponsibilityLocal = JSON.parse(localStorage.getItem('positionsofresponsibility'));
    if(positionsofresponsibilityLocal)
      this.state.positionsofresponsibility = positionsofresponsibilityLocal;
    //----------------------------------------------------------//
    //----------------------------------------------------------//
    const extracurricularactivitiesLocal = JSON.parse(localStorage.getItem('extracurricularactivities'));
    if(extracurricularactivitiesLocal)
      this.state.extracurricularactivities = extracurricularactivitiesLocal;
    //----------------------------------------------------------//
    //----------------------------------------------------------//
    const hobbiesandinterestsLocal = JSON.parse(localStorage.getItem('hobbiesandinterests'));
    if(hobbiesandinterestsLocal)
      this.state.hobbiesandinterests = hobbiesandinterestsLocal;
    //----------------------------------------------------------//
  }

  imageUploadingFunction = (value = true, data) =>  {
    if(value)
      return this.state.imageUploading;
    else
      this.setState({imageUploading: data});
  }

  removeFunction = (type, index) => {
    var array;
    switch(type) {
      case 0:
          array = [...this.state.academicprojects];
          array.splice(index,1);
          this.setState({academicprojects:array}, () =>{
            localStorage.setItem('academicprojects',JSON.stringify(this.state.academicprojects));
          });
          break;
      case 1:
          array = [...this.state.achievements];
          array.splice(index,1);
          this.setState({achievements:array}, () => {
            localStorage.setItem('achievements',JSON.stringify(this.state.achievements));
          });
          break;
      case 2:
          array = [...this.state.areasofinterest];
          array.splice(index,1);
          this.setState({areasofinterest:array}, () => {
            localStorage.setItem('areasofinterest',JSON.stringify(this.state.areasofinterest));
        });
          break;
      case 4:
          array = [...this.state.courses];
          array.splice(index,1);
          this.setState({courses:array},() => {
            localStorage.setItem('courses',JSON.stringify(this.state.courses));
          });
          break;
      case 5:
          array = [...this.state.educationdetails];
          array.splice(index,1);
          this.setState({educationdetails:array}, () => {
            localStorage.setItem('educationdetails',JSON.stringify(this.state.educationdetails));
          });
          break;
      case 6:
          array = [...this.state.experience];
          array.splice(index,1);
          this.setState({experience:array}, () => {
            localStorage.setItem('experience',JSON.stringify(this.state.experience));
          });
          break;
      case 7:
          array = [...this.state.extracurricularactivities];
          array.splice(index,1);
          this.setState({extracurricularactivities:array},() => {
            localStorage.setItem('extracurricularactivities',JSON.stringify(this.state.extracurricularactivities));
          });
          break;
      case 8:
          array = [...this.state.hobbiesandinterests];
          array.splice(index,1);
          this.setState({hobbiesandinterests:array},() => {
            localStorage.setItem('hobbiesandinterests',JSON.stringify(this.state.hobbiesandinterests));
          });
          break;
      case 9:
          array = [...this.state.positionsofresponsibility];
          array.splice(index,1);
          this.setState({positionsofresponsibility:array},() => {
            localStorage.setItem('positionsofresponsibility',JSON.stringify(this.state.positionsofresponsibility));
          });
          break;
      case 10:
          array = [...this.state.publications];
          array.splice(index,1);
          this.setState({publications:array},() => {
            localStorage.setItem('publications',JSON.stringify(this.state.publications));
          });
          break;
      case 11:
          array = [...this.state.technicalproficiency];
          array.splice(index,1);
          this.setState({technicalproficiency:array},() => {
            localStorage.setItem('technicalproficiency',JSON.stringify(this.state.technicalproficiency));
          });
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
          this.setState({academicprojects:array},() => {
            localStorage.setItem('academicprojects',JSON.stringify(this.state.academicprojects));
          });
          break;
      case 1:
          array = [...this.state.achievements];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({achievements:array},() => {
            localStorage.setItem('achievements',JSON.stringify(this.state.achievements));
          });
          break;
      case 2:
          array = [...this.state.areasofinterest];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({areasofinterest:array},() => {
            localStorage.setItem('areasofinterest',JSON.stringify(this.state.areasofinterest));
          });
          break;
      case 4:
          array = [...this.state.courses];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({courses:array},() => {
            localStorage.setItem('courses',JSON.stringify(this.state.courses));
          });
          break;
      case 5:
          array = [...this.state.educationdetails];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({educationdetails:array},() => {
            localStorage.setItem('educationdetails',JSON.stringify(this.state.educationdetails));
          });
          break;
      case 6:
          array = [...this.state.experience];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({experience:array},() => {
            localStorage.setItem('experience',JSON.stringify(this.state.experience));
          });
          break;
      case 7:
          array = [...this.state.extracurricularactivities];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({extracurricularactivities:array},() => {
            localStorage.setItem('extracurricularactivities',JSON.stringify(this.state.extracurricularactivities));
          });
          break;
      case 8:
          array = [...this.state.hobbiesandinterests];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({hobbiesandinterests:array},() => {
            localStorage.setItem('hobbiesandinterests',JSON.stringify(this.state.hobbiesandinterests));
          });
          break;
      case 9:
          array = [...this.state.positionsofresponsibility];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({positionsofresponsibility:array},() => {
            localStorage.setItem('positionsofresponsibility',JSON.stringify(this.state.positionsofresponsibility));
          });
          break;
      case 10:
          array = [...this.state.publications];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({publications:array},() => {
            localStorage.setItem('publications',JSON.stringify(this.state.publications));
          });
          break;
      case 11:
          array = [...this.state.technicalproficiency];
          array.splice(index,1);
          array.splice(index,0,data);
          this.setState({technicalproficiency:array},() => {
            localStorage.setItem('technicalproficiency',JSON.stringify(this.state.technicalproficiency));
          });
          break;
      default: console.log("Not Defined");
    }
  }

  submitHandler = (type, data) => {
    switch(type) {
      case 0:
          this.setState({academicprojects: [...this.state.academicprojects, data]},() => {
            localStorage.setItem('academicprojects',JSON.stringify(this.state.academicprojects));
          });
          break;
      case 1:
          this.setState({achievements: [...this.state.achievements, data]},() => {
            localStorage.setItem('achievements',JSON.stringify(this.state.achievements));
          });
          break;
      case 2:
          this.setState({areasofinterest: [...this.state.areasofinterest, data]},() => {
            localStorage.setItem('areasofinterest',JSON.stringify(this.state.areasofinterest));
          });
          break;
      case 3:
          this.setState({basic: data});
          localStorage.setItem('basic',JSON.stringify(data));
          break;
      case 4:
          this.setState({courses: [...this.state.courses, data]},() => {
            localStorage.setItem('courses',JSON.stringify(this.state.courses));
          });
          break;
      case 5:
          this.setState({educationdetails: [...this.state.educationdetails, data]},() => {
            localStorage.setItem('educationdetails',JSON.stringify(this.state.educationdetails));
          });
          break;
      case 6:
          this.setState({experience: [...this.state.experience, data]},() => {
            localStorage.setItem('experience',JSON.stringify(this.state.experience));
          });
          break;
      case 7:
          this.setState({extracurricularactivities: [...this.state.extracurricularactivities, data]},() => {
            localStorage.setItem('extracurricularactivities',JSON.stringify(this.state.extracurricularactivities));
          });
          break;
      case 8:
          this.setState({hobbiesandinterests: [...this.state.hobbiesandinterests, data]},() => {
            localStorage.setItem('hobbiesandinterests',JSON.stringify(this.state.hobbiesandinterests));
          });
          break;
      case 9:
          this.setState({positionsofresponsibility: [...this.state.positionsofresponsibility, data]},() => {
            localStorage.setItem('positionsofresponsibility',JSON.stringify(this.state.positionsofresponsibility));
          });
          break;
      case 10:
          this.setState({publications: [...this.state.publications, data]},() => {
            localStorage.setItem('publications',JSON.stringify(this.state.publications));
          });
          break;
      case 11:
          this.setState({technicalproficiency: [...this.state.technicalproficiency, data]},() => {
            localStorage.setItem('technicalproficiency',JSON.stringify(this.state.technicalproficiency));
          });
          break;
      default: console.log("Not Defined");
    }
  }


  //Final Submit Function
  finalSubmit = async (e) => {
    await this.setState({photoName: localStorage.getItem("photoName")});
		e.preventDefault();
		axios.post('http://localhost:4000/serverport',this.state )
          .then(res => {
          	if(res.data)
          	{
          		window.open('http://localhost:4000/serverport/'+this.state.photoName);
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
              <BasicDetails fields={this.state.basic} submit={this.submitHandler} imageUploading = {this.imageUploadingFunction}/>
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


        <button style={{margin:"10px", padding:"7px"}} className="btn btn-success btn-lg" onClick={this.finalSubmit} disabled={this.state.imageUploading}>Submit</button>
      </React.Fragment>
    );
  }
}
