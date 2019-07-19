import React, {Component,Fragment} from 'react';

export default class courses extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				course: "" 
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<input type="text" className="form-control" name={"course"} placeholder="Course Name"
							onChange = { (e) => {
								field.course = e.target.value;
								this.props.coursesData(fields);
							} }
						/>
						<button className="btn btn-default btn-danger" onClick={ (e) => {
							e.preventDefault();
							this.setState(state => ({
								fields: state.fields.filter(f => f.id !== field.id)
							}));
							this.props.coursesData(this.state.fields.filter(f => f.id!==field.id));
						} }>Remove</button>
					</div>	
					) )}
				<button className="btn btn-default btn-primary" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							course: "" 
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