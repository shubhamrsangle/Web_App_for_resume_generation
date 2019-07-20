import React, {Component,Fragment} from 'react';
import './educationdetails.css';
export default class educationdetails extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				programme: "",
				institute: "",
				year: "",
				marks: "" 
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				<div className = "edu-details">
					Education details:
				</div>
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<input type="text" className="form-control" name={"programme"} placeholder="Programme"
							onChange = { (e) => {
								field.programme = e.target.value;
								this.props.educationdetailsData(fields);
							} }
						/>
						<input type="text" className="form-control" name={"institute"} placeholder="Institute"
							onChange = { (e) => {
								field.institute = e.target.value;
								this.props.educationdetailsData(fields);
							} }
						/>
						<input type="text" className="form-control" name={"year"} placeholder="Year"
							onChange = { (e) => {
								field.year = e.target.value;
								this.props.educationdetailsData(fields);
							} }
						/>
						<input type="text" className="form-control" name={"marks"} placeholder="%/CGPA"
							onChange = { (e) => {
								field.marks = e.target.value;
								this.props.educationdetailsData(fields);
							} }
						/>
						<button className="btn btn-default btn-danger" onClick={ (e) => {
							e.preventDefault();
							this.setState(state => ({
								fields: state.fields.filter(f => f.id !== field.id)
							}));
							this.props.educationdetailsData(this.state.fields.filter(f => f.id!==field.id));
						} }>Remove</button>
					</div>	
					) )}
				<button className="btn btn-default btn-primary" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							programme: "",
							institute: "",
							year: "",
							marks: "" 
						};
					this.setState(state => ({
						nfields : state.nfields + 1,
						fields: [...state.fields,newField]
					}));
				}}>Add</button>
			</Fragment>
		)
	}
}