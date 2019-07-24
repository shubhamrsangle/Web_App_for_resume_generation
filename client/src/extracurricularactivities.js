import React, {Component,Fragment} from 'react';
import './extracurricularactivities.css';
export default class extracurricularactivities extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				activity: "",
				excduration: ""
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				<div className = "EXC"> Extra Curricular Activies: </div>
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<textarea name={"activity"} placeholder="Extra Curricular Activity" className = "EXC-form-control-1"
							onChange = { (e) => {
								field.activity = e.target.value;
								this.props.extracurricularactivitiesData(fields);
							} }
						/>
						<input type="text" className="EXC-form-control" name={"excduration"} placeholder="Duration(From-To)"
							onChange = { (e) => {
								field.excduration = e.target.value;
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
				<button className="btn btn-default btn-primary EXC-add" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							activity: "",
							excduration: ""
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
