import React, {Component,Fragment} from 'react';

export default class experience extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				experience: "",
				expduration: "",
				expguide: "",
				expdescription: ""
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<input type="text" className="form-control" name={"experience"} placeholder="Experience"
							onChange = { (e) => {
								field.experience = e.target.value;
								this.props.experienceData(fields);
							} }
						/>
						<input type="text" className="form-control" name={"expduration"} placeholder="Duration(From-To)"
							onChange = { (e) => {
								field.expduration = e.target.value;
								this.props.experienceData(fields);
							} }
						/>
						<input type="text" className="form-control" name={"expguide"} placeholder="Guide(if any)"
							onChange = { (e) => {
								field.expguide = e.target.value;
								this.props.experienceData(fields);
							} }
						/>
						<textarea name={"expdescription"} placeholder="About Experience"
							onChange = { (e) => {
								field.expdescription = e.target.value;
								this.props.experienceData(fields);
							} }
						/>
						<button className="btn btn-default btn-danger" onClick={ (e) => {
							e.preventDefault();
							this.setState(state => ({
								fields: state.fields.filter(f => f.id !== field.id)
							}));
							this.props.experienceData(this.state.fields.filter(f => f.id!==field.id));
						} }>Remove</button>
					</div>	
					) )}
				<button className="btn btn-default btn-primary" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							experience: "",
							expduration: "",
							expguide: "",
							expdescription: ""
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