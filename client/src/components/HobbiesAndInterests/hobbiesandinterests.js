import React, {Component,Fragment} from 'react';

export default class hobbiesandinterests extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				hobby: "" 
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<textarea name={"hobby"} placeholder="Hobby or Interest"
							onChange = { (e) => {
								field.hobby = e.target.value;
								this.props.hobbiesandinterestsData(fields);
							} }
						/>
						<button className="btn btn-default btn-danger" onClick={ (e) => {
							e.preventDefault();
							this.setState(state => ({
								fields: state.fields.filter(f => f.id !== field.id)
							}));
							this.props.hobbiesandinterestsData(this.state.fields.filter(f => f.id!==field.id));
						} }>Remove</button>
					</div>	
					) )}
				<button className="btn btn-default btn-primary" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							hobby: "" 
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