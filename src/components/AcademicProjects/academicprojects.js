import React, {Component,Fragment} from 'react';
import './academicprojects.css';
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
				<div className = "AP"> Academic Projects: </div>
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<div>
						<div style={{padding: '10px 10px',margin:'5px 50px'}}>
							<input type="text" className="AP-form-control" name={"projectname"} placeholder="Project Name"
								onChange = { (e) => {
									field.projectname = e.target.value;
									this.props.academicprojectsData(fields);
								} }
							/>
						</div>
						<div style={{padding: '10px 10px',margin:'5px 50px'}}>
							<input type="text" className="AP-form-control" name={"projectduration"} placeholder="Duration(From-To)"
								onChange = { (e) => {
									field.projectduration = e.target.value;
									this.props.academicprojectsData(fields);
								} }
							/>
						</div>
						<div style={{padding: '10px 10px',margin:'5px 50px'}}>
						<input type="text" className="AP-form-control" name={"projectguide"} placeholder="Guide(if any)"
							onChange = { (e) => {
								field.projectguide = e.target.value;
								this.props.academicprojectsData(fields);
							} }
						/>
						</div>
						</div>
						<div>
							<textarea name={"projectdescription"} placeholder="Project Description" className = "AP-form-control-1"
								onChange = { (e) => {
									field.projectdescription = e.target.value;
									this.props.academicprojectsData(fields);
								} }
							/>
						</div>
						<button className="btn btn-default btn-danger" onClick={ (e) => {
							e.preventDefault();
							this.setState(state => ({
								fields: state.fields.filter(f => f.id !== field.id)
							}));
							this.props.academicprojectsData(this.state.fields.filter(f => f.id!==field.id));
						} }>Remove</button>
					</div>	
					) )}
				<button className="btn btn-default btn-primary AP-add" onClick={ (e) => {
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