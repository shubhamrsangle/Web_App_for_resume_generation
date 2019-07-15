import React, {Component,Fragment} from 'react';

export default class educationdetails extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				programme: "",
				institue: "",
				year: "",
				marks: "" 
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				{fields.map( ({id,programme,year,marks,institute}) => (
					<div className="form-inline" key={id}>
						<input type="text" className="form-control" name={"programme"} placeholder="Programme"/>
						<input type="text" className="form-control" name={"institute"} placeholder="Institute"/>
						<input type="text" className="form-control" name={"year"} placeholder="Year"/>
						<input type="text" className="form-control" name={"marks"} placeholder="%/CGPA"/>
						<button className="btn btn-default btn-danger" onClick={ (e) => {
							e.preventDefault();
							this.setState(state => ({
								fields: state.fields.filter(field => field.id !== id)
							}));
						} }>Remove</button>
					</div>	
					) )}
				<button className="btn btn-default btn-primary" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							programme: "",
							institue: "",
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