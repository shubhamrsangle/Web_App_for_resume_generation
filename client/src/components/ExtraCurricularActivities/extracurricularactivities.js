import React, {Component,Fragment} from 'react';

export default class extracurricularactivities extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				activity: "",
				extduration: ""
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<textarea name={"activity"} placeholder="Extra Curricular Activity"
							onChange = { (e) => {
								field.activity = e.target.value;
								this.props.extracurricularactivitiesData(fields);
							} }
						/>
						<input type="text" className="form-control" name={"extduration"} placeholder="Duration(From-To)"
							onChange = { (e) => {
								field.extduration = e.target.value;
								this.props.extracurricularactivitiesData(fields);
							} }
						/>
						<button className="btn btn-default btn-danger" onClick={ (e) => {
							e.preventDefault();
							this.setState(state => ({
								fields: state.fields.filter(f => f.id !== field.id)
							}));
							this.props.extracurricularactivitiesData(this.state.fields.filter(f => f.id!==field.id));
						} }>Remove</button>
					</div>	
					) )}
				<button className="btn btn-default btn-primary" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							activity: "",
							extduration: ""
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
