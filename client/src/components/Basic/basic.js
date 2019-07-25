import React , {Component,Fragment} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class basic extends Component {
	type = 3;
	state = {
			modal: false,
			name: "",
			email: "",
			degree: "B.Tech",
			linkedinid: ""
	}

	eventHandler = (e) => {this.setState({[e.target.name]: e.target.value})}

	toggle = () => {
		this.setState({modal: !this.state.modal});
	}

  submit = (event) => {
    event.preventDefault();
		this.toggle();
    const body = {
			name: this.state.name,
			email: this.state.email,
			degree: this.state.degree,
			linkedinid: this.state.linkedinid
		};
    this.props.submit(this.type, body);
  }

	render() {
		return (
			<Fragment>
				{
					this.props.fields === {} ? <React.Fragment></React.Fragment>:
						<Fragment>
						<div className="col-12 col-md-6 col-lg-4">
						<div className="card col-auto">
							<div className="card-header">
								<h3 className="card-title">Details</h3>
							</div>
							<div className="card-body text-center">
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<strong>Name</strong> : {this.props.fields.name}
									</li>
									<li className="list-group-item">
										<strong>Email</strong> : {this.props.fields.email}
									</li>
									<li className="list-group-item">
										<strong>Degree</strong> : {this.props.fields.degree}
									</li>
									<li className="list-group-item">
										<strong>LinkedIn Id</strong> : {this.props.fields.linkedinid}
									</li>
								</ul>


								</div>
							</div>
						</div>
						</Fragment>
				}
				{
					<Fragment>
					<button className="btn-info col-6" onClick={this.toggle}>
							{this.props.fields === {} ? "Add" : "Edit"}
					</button>
					<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
						<ModalHeader toggle={this.toggle}>Edit the Academic Project</ModalHeader>
						<ModalBody>
						<form onSubmit={this.submit} id="basicForm" name="basicForm">
						 <input type="text" className="form-control" name={"name"} placeholder="Name" value={this.state.name}
							onChange={this.eventHandler}/>
						 <input type="text" className="form-control" name={"email"} placeholder="Email Id" value={this.state.email}
							onChange = {this.eventHandler}/>
						<div onChange = { (e) => {this.setState({degree: e.target.value});} }>
		 					<label className="radio-inline"><input type="radio" name="degree" defaultChecked value="B.Tech"/>B.Tech</label>
		 					<label className="radio-inline"><input type="radio" name="degree" value="M.Tech"/>M.Tech</label>
		 				</div>
						 <input type="text" className="form-control" name={"linkedinid"} placeholder="LinkedIn Id" value={this.state.linkedinid}
							onChange = {this.eventHandler}/>
						</form>
						</ModalBody>
						<ModalFooter>
							 <button type="submit" form="basicForm">Submit</button>
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					</Modal>
					</Fragment>
				}
			</Fragment>
		);
	}
}
