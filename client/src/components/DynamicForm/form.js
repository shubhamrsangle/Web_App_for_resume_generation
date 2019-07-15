import React,{ Component } from 'react';
import Basic from '../Basic/basic.js';
import EducationDetails from '../EducationDetails/educationdetails';

export default class form extends Component {
	render() {
		return(
			<div className="form">
				<form>
					<Basic />
					<EducationDetails/>
				</form>
			</div>
		);
	}
}