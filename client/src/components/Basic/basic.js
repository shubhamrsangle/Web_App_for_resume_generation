import React , {Component,Fragment} from 'react';

export default class basic extends Component {

	state = {
			name: "",
			email: "",
			degree: "B.Tech",
			linkdinid: ""
	}

	eventHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submit = (event) => {
    event.preventDefault();
    const body = this.state;
    this.props.submit(body);
  }

	render() {
		return (
			<Fragment>
				{
					this.props.addState ? <React.Fragment></React.Fragment>:
						<React.Fragment>
							<p>{this.props.fields.name}</p>
						</React.Fragment>
				}
				{
					this.props.addState ? <React.Fragment>
					<form name="basicDetails" onSubmit={this.submit}>
					<div className="form-inline" style={{padding: '10px 10px',margin:'5px 5px'}}>
						<input type="text" className="form-control" name="name" placeholder="Name"
							onChange = {this.eventHandler}/>
						<input type="email" className="form-control" name="email" placeholder="College Email-id"
							onChange = {this.eventHandler}/>
					</div>
					<div className="form-inline" style={{padding: '10px 10px',margin:'5px 5px'}}>
						<div onChange={this.eventHandler}>
							<label className="radio-inline"><input type="radio" name="degree" defaultChecked value="B.Tech"/>B.Tech</label>
							<label className="radio-inline"><input type="radio" name="degree" value="M.Tech"/>M.Tech</label>
						</div>
						<input type="text" className="form-control" name="linkdinid" placeholder="Linkedin id"
							onChange = {this.eventHandler}/>
						</div>
						<input type="submit" className="primary"/>
					</form>
					</React.Fragment>:
						<React.Fragment></React.Fragment>
				}
			</Fragment>
		);
	}
}
