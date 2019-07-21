import React, {Component,Fragment} from 'react';
import './positionsofresponsibility.css';
export default class positionsofresponsibility extends Component {	

	state = {
		nfields : 1,
		fields : [
			{
				id: 0,
				position: "",
				posduration: "",
				workdescription: ""
			}
		]
	}

	render() {
		const { fields } = this.state;
		return (
			<Fragment>
				<div className = "POS"> Positions of Resposibility: </div> 
				{fields.map( (field) => (
					<div className="form-inline" key={field.id}>
						<div>
							<div style={{padding: '10px 10px',margin:'5px 50px'}}>
								<input type="text" className="POS-form-control" name={"position"} placeholder="Position"
									onChange = { (e) => {
										field.position = e.target.value;
										this.props.positionsofresponsibilityData(fields);
									} }
								/>
							</div>
							<div style={{padding: '10px 10px',margin:'5px 50px'}}>
								<input type="text" className="POS-form-control" name={"posduration"} placeholder="Duration(From-To)"
									onChange = { (e) => {
										field.posduration = e.target.value;
										this.props.positionsofresponsibilityData(fields);
									} }
								/>
							</div>
						</div>
						<textarea name={"workdescription"} placeholder="Work Done" className = "POS-form-control-1"
							onChange = { (e) => {
								field.workdescription = e.target.value;
								this.props.positionsofresponsibilityData(fields);
							} }
						/>
						<button className="btn btn-default btn-danger" onClick={ (e) => {
							e.preventDefault();
							this.setState(state => ({
								fields: state.fields.filter(f => f.id !== field.id)
							}));
							this.props.positionsofresponsibilityData(this.state.fields.filter(f => f.id!==field.id));
						} }>Remove</button>
					</div>	
					) )}
				<button className="btn btn-default btn-primary POS-add" onClick={ (e) => {
					e.preventDefault();
					var newField = {
							id: this.state.nfields,
							position: "",
							posduration: "",
							workdescription: ""
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