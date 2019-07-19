import React, {Component,Fragment} from 'react';

export default class technicalproficiency extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				title: "",
				titlevalue: "" 
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<input type="text" className="form-control" name={"title"} placeholder="Title"
							onChange = { (e) => {
								field.title = e.target.value;
								this.props.technicalproficiencyData(fields);
							} }
						/>
						<textarea name={"titlevalue"} placeholder="Value"
							onChange = { (e) => {
								field.titlevalue = e.target.value;
								this.props.technicalproficiencyData(fields);
							} }
						/>
						<button className="btn btn-default btn-danger" onClick={ (e) => {
							e.preventDefault();
							this.setState(state => ({
								fields: state.fields.filter(f => f.id !== field.id)
							}));
							this.props.technicalproficiencyData(this.state.fields.filter(f => f.id!==field.id));
						} }>Remove</button>
					</div>	
					) )}
				<button className="btn btn-default btn-primary" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							title : "",
							titlevalue: "" 
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