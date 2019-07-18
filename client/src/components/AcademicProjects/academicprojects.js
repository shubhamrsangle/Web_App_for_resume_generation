import React, {Component,Fragment} from 'react';

export default class academicprojects extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				projectname: "",
				projectduration: "",
				projectguide: "",
				projectdescription: ""
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<input type="text" className="form-control" name={"projectname"} placeholder="Project Name"
							onChange = { (e) => {
								field.projectname = e.target.value;
								this.props.academicprojectsData(fields);
							} }
						/>
						<input type="text" className="form-control" name={"projectduration"} placeholder="Duration(From-To)"
							onChange = { (e) => {
								field.projectduration = e.target.value;
								this.props.academicprojectsData(fields);
							} }
						/>
						<input type="text" className="form-control" name={"projectguide"} placeholder="Guide(if any)"
							onChange = { (e) => {
								field.projectguide = e.target.value;
								this.props.academicprojectsData(fields);
							} }
						/>
						<textarea name={"projectdescription"} placeholder="Project Description"
							onChange = { (e) => {
								field.projectdescription = e.target.value;
								this.props.academicprojectsData(fields);
							} }
						/>
						<button className="btn btn-default btn-danger" onClick={ (e) => {
							e.preventDefault();
							this.setState(state => ({
								fields: state.fields.filter(f => f.id !== field.id)
							}));
							this.props.academicprojectsData(this.state.fields.filter(f => f.id!==field.id));
						} }>Remove</button>
					</div>	
					) )}
				<button className="btn btn-default btn-primary" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							projectname: "",
							projectduration: "",
							projectguide: "",
							projectdescription: ""
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