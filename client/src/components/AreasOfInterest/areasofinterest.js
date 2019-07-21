import React, {Component,Fragment} from 'react';
import './areasofinterest.css';
export default class areasofinterest extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				interest: "" 
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				<div className = "AOD"> Areas of Interest </div>
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<input type="text" className="form-control" name={"interest"} placeholder="Area Of Interest"
							onChange = { (e) => {
								field.interest = e.target.value;
								this.props.areasofinterestData(fields);
							} }
						/>
						<button className="btn btn-default btn-danger" onClick={ (e) => {
							e.preventDefault();
							this.setState(state => ({
								fields: state.fields.filter(f => f.id !== field.id)
							}));
							this.props.areasofinterestData(this.state.fields.filter(f => f.id!==field.id));
						} }>Remove</button>
					</div>	
					) )}
				<button className="btn btn-default btn-primary AOF-add" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							interest: "" 
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