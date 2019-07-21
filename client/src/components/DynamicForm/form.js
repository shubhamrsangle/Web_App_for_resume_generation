import React,{ Component } from 'react';
import Basic from '../Basic/basic.js';
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
import axios from 'axios';
import './form.css';

export default class form extends Component {

	state = {
		basic : null,
		educationdetails : null,
		areasofinterest : null,
		technicalproficiency : null,
		publications :null,
		academicprojects : null,
		experience : null,
		courses : null,
		achievements : null,
		positionsofresponsibility: null,
		extracurricularactivities : null,
		hobbiesandinterests : null
	}

	submitHandler = (e) => {
		e.preventDefault();
		console.log(this.state);
		alert('Check console to see the submitted data using ctrl + shift + i ....');
		axios.post('http://localhost:4000/serverport',this.state )
          .then(res => console.log(res));
	}

	hobbiesandinterestsData = (data) => {
		this.setState( (state) => {
			state.hobbiesandinterests = data;
		});
	}

	extracurricularactivitiesData = (data) => {
		this.setState( (state) => {
			state.extracurricularactivities = data;
		});
	}

	positionsofresponsibilityData = (data) => {
		this.setState( (state) => {
			state.positionsofresponsibility = data;
		});
	}

	achievementsData = (data) => {
		this.setState( (state) => {
			state.achievements = data;
		});
	}

	coursesData = (data) => {
		this.setState( (state) => {
			state.courses = data;
		});
	}

	experienceData = (data) => {
		this.setState( (state) => {
			state.experience = data;
		});
	}

	academicprojectsData = (data) => {
		this.setState( (state) => {
			state.academicprojects = data;
		});
	}

	publicationsData = (data) => {
		this.setState( (state) => {
			state.publications = data;
		});
	}

	technicalproficiencyData = (data) => {
		this.setState( (state) => {
			state.technicalproficiency = data;
		});
	}

	areasofinterestData = (data) => {
		this.setState( (state) => {
			state.areasofinterest = data;
		});
	}

	educationdetailsData = (data) => {
		this.setState( (state) => {
			state.educationdetails = data;
		});
	}

	basicData = (data) => {
		this.setState( (state) => {
			state.basic = data;
		});
	}

	render() {
		return(
			<div className="form">
				<form onSubmit={ (e) => {this.submitHandler(e)}}>
					<Basic basicData={this.basicData}/>
					<EducationDetails educationdetailsData={this.educationdetailsData}/>
					<AreasOfInterest areasofinterestData={this.areasofinterestData}/>
					<TechnicalProficiency technicalproficiencyData={this.technicalproficiencyData}/>
					<Publications publicationsData={this.publicationsData}/>
					<AcademicProjects academicprojectsData={this.academicprojectsData}/>
					<Experience experienceData={this.experienceData}/>
					<Courses coursesData={this.coursesData}/>
					<Achievements achievementsData={this.achievementsData}/>
					<PositionsOfResponsibility positionsofresponsibilityData={this.positionsofresponsibilityData}/>
					<ExtraCurricularActivities extracurricularactivitiesData={this.extracurricularactivitiesData}/>
					<HobbiesAndInterests hobbiesandinterestsData={this.hobbiesandinterestsData}/>
					<div>
							<button className="btn btn-default btn-success" type="submit">Submit</button>
					</div>
				</form>
			</div>
		);
	}
}
