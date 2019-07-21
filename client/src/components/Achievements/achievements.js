import React, {Component,Fragment} from 'react';
import './achievements.css';
export default class achievements extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				achievement: "" 
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				<div className = "AM"> Achievements: </div>
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<input type="text" className="form-control" name={"achievement"} placeholder="Achievement"
							onChange = { (e) => {
								field.achievement = e.target.value;
								this.props.achievementsData(fields);
							} }
						/>
						<button className="btn btn-default btn-danger" onClick={ (e) => {
							e.preventDefault();
							this.setState(state => ({
								fields: state.fields.filter(f => f.id !== field.id)
							}));
							this.props.achievementsData(this.state.fields.filter(f => f.id!==field.id));
						} }>Remove</button>
					</div>	
					) )}
				<button className="btn btn-default btn-primary AM-add" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							achievement: "" 
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