import React,{ Component } from 'react';
import Basic from '../Basic/basic.js';
import EducationDetails from '../EducationDetails/educationdetails';

export default class form extends Component {

	state = {
		basic : null,
		educationdetails : null
	}

	submitHandler = (e) => {
		e.preventDefault();
		console.log(this.state);
		alert('Check console to see the submitted data using ctrl + shift + i ....');
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
					<div>
							<button className="btn btn-default btn-success" type="submit">Submit</button>
					</div>
				</form>
			</div>
		);
	}
}