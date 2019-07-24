import React, {Component,Fragment} from 'react';

export default class publications extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				pubtitle: "",
				pubauthors: "",
				pubplace: "",
				pubdescription: "",
				pubdoi: ""
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<input type="text" className="form-control" name={"pubtitle"} placeholder="Title"
							onChange = { (e) => {
								field.pubtitle = e.target.value;
								this.props.publicationsData(fields);
							} }
						/>
						<input type="text" className="form-control" name={"pubauthors"} placeholder="Authors"
							onChange = { (e) => {
								field.pubauthors = e.target.value;
								this.props.publicationsData(fields);
							} }
						/>
						<input type="text" className="form-control" name={"pubplace"} placeholder="Place of Publication"
							onChange = { (e) => {
								field.pubplace = e.target.value;
								this.props.publicationsData(fields);
							} }
						/>
						<textarea name={"pubdescription"} placeholder="About the Publication"
							onChange = { (e) => {
								field.pubdescription = e.target.value;
								this.props.publicationsData(fields);
							} }
						/>
						<input type="text" className="form-control" name={"pubdoi"} placeholder="DOI"
							onChange = { (e) => {
								field.pubdoi = e.target.value;
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
				<button className="btn btn-default btn-primary" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							pubtitle: "",
							pubauthors: "",
							pubplace: "",
							pubdescription: "",
							pubdoi: ""
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
