import React, {Component,Fragment} from 'react';
import './publications.css';
export default class publications extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				pubtitle: "",
				pubplace: "",
				pubdescription: ""
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				<div className = "PUB"> Publications: </div>
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<div>
							<div style={{padding: '10px 10px',margin:'5px 50px'}}>
								<input type="text" className="PUB-form-control" name={"pubtitle"} placeholder="Title"
									onChange = { (e) => {
										field.pubtitle = e.target.value;
										this.props.publicationsData(fields);
									} }
								/>
							</div>
							<div style={{padding: '10px 10px',margin:'5px 50px'}}>
								<input type="text" className="PUB-form-control" name={"pubplace"} placeholder="Place of Publication"
									onChange = { (e) => {
										field.pubplace = e.target.value;
										this.props.publicationsData(fields);
									} }
								/>
							</div>
						</div>
						<textarea name={"pubdescription"} placeholder="About the Publication" className = "PUB-form-control-1"
							onChange = { (e) => {
								field.pubdescription = e.target.value;
								this.props.publicationsData(fields);
							} }
						/>
						<button className="btn btn-default btn-danger" onClick={ (e) => {
							e.preventDefault();
							this.setState(state => ({
								fields: state.fields.filter(f => f.id !== field.id)
							}));
							this.props.publicationsData(this.state.fields.filter(f => f.id!==field.id));
						} }>Remove</button>
					</div>	
					) )}
				<button className="btn btn-default btn-primary PUB-add" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							pubtitle: "",
							pubplace: "",
							pubdescription: ""
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