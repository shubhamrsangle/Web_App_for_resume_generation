import React , {Component,Fragment} from 'react';
import './basic.css';
export default class basic extends Component {

	state = {
		fields : {
			name: "",
			email: "",
			degree: "B.Tech",
			linkdinid: ""
		}
	}

	render() {
		const {fields} = this.state;
		return (
			<Fragment>
			<div className="form-inline" style={{padding: '10px 10px',margin:'5px 5px'}}>
				<input type="text" className="name-control" name="name" placeholder="Name"
					onChange = { (e) => {
						fields.name = e.target.value;
						this.props.basicData(fields);
					} }
				/>
				<input type="email" className="email-control" name="email" placeholder="College Email-id"
					onChange = { (e) => {
						fields.email = e.target.value;
						this.props.basicData(fields);
					} }
				/>
			</div>
			<div className="form-inline" style={{padding: '10px 10px',margin:'5px 5px'}}>
				<div 
				onChange = { (e) => {
					fields.degree = e.target.value;
					this.props.basicData(fields);
				} }
				>
					<label className="radio-inline"><input type="radio" name="degree" defaultChecked value="B.Tech"/>B.Tech</label>
					<label className="radio-inline"><input type="radio" name="degree" value="M.Tech"/>M.Tech</label>
				</div>	
				<input type="text" className="linkd-control" name="linkdinid" placeholder="Linkedin id"
					onChange = { (e) => {
						fields.linkdinid = e.target.value;
						this.props.basicData(fields);
					} }
				/>
			</div>
			</Fragment>
		);
	}
}