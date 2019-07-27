import React , {Component,Fragment} from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class basic extends Component {

	type = 3;
	
	constructor(props){
		super(props);
		this.state = {
			modal: false,
			name: "",
			email: "",
			degree: "B.Tech",
			photo: null,
			linkedinid: "",
			img: null
		}
		const { name,email,degree,linkedinid } = JSON.parse(localStorage.getItem('basic'));
		if(name)
			this.state.name = name;
		if(email)
			this.state.email = email;
		if(degree)
			this.state.degree = degree;
		if(linkedinid)
			this.state.linkedinid = linkedinid;
	}

	eventHandler = (e) => {this.setState({[e.target.name]: e.target.value})}

	toggle = () => {
		this.setState({modal: !this.state.modal});
	}

  submit = async (event) => {
    event.preventDefault();
		this.toggle();

		if (this.state.img !== null) {
			const formData = new FormData();
	        formData.append('photo',this.state.img);
	        const config = {
	            headers: {
	                'content-type': 'multipart/form-data'
	            }
	        };
	        await axios.post("http://localhost:4000/serverport/upload",formData,config)
	            .then((response) => {
								alert('done');
								console.log(this.state.img);
								this.setState({
									photo:this.state.img
								});
								this.setState({img:null});
	            }).catch((error) => {
								alert("File not uploaded... Try again");
	        });
		}

		const body = {
			name: this.state.name,
			email: this.state.email,
			degree: this.state.degree,
			linkedinid: this.state.linkedinid,
			photo: this.state.photo
		};
		console.log(body);
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
							<div className="row">
							<div className="card-body text-center col-6">
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
								<div className="col-6 align-self-center">
								<figure className="figure">
									<img className="figure-img rounded mx-auto d-block" width="70%" height="auto"
										src={this.state.photo !== null ? "http://localhost:4000/passportphoto." + this.state.photo.name.split('.').pop() : "http://localhost:4000/noProfilePic.jpg"} alt="No Profile Pic" />
									<figcaption className="text-center figure-caption">
										{this.state.photo ? "Passport Size Photo" : "Add Your Photo"}
									</figcaption>
								</figure>
								{
									this.state.photo === null ? <React.Fragment></React.Fragment> :
									 	<React.Fragment>
											<button className="btn-danger" onClick={() => { 
												axios.post('http://localhost:4000/serverport/removePhoto')
												.then((response) => {
													alert('removed');
													this.setState({
														photo:null
													});
													const body = {
														name: this.state.name,
														email: this.state.email,
														degree: this.state.degree,
														linkedinid: this.state.linkedinid,
														photo: this.state.photo !== null ? this.state.photo.name : null
													};
													console.log(body);
											    this.props.submit(this.type, body);
												}).catch((error) => {
													alert("Photo could not be removed... Try again" + error);
										});
											}}>
													Remove Photo
											</button>
										</React.Fragment>
								}

								</div>
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
						<form onSubmit={this.submit} id="basicForm" encType="multipart/form-data" name="basicForm">
						 <input type="text" className="form-control" name={"name"} placeholder="Name" value={this.state.name}
							onChange={this.eventHandler}/>
						 <input type="email" className="form-control" name={"email"} placeholder="Email Id" value={this.state.email}
							onChange = {this.eventHandler}/>
						<div onChange = { (e) => {this.setState({degree: e.target.value});} }>
		 					<label className="radio-inline"><input type="radio" name="degree" defaultChecked={this.state.degree==="B.Tech"} value="B.Tech"/>B.Tech</label>
		 					<label className="radio-inline"><input type="radio" name="degree" defaultChecked={this.state.degree==="M.Tech"} value="M.Tech"/>M.Tech</label>
		 				</div>
						 <input type="text" className="form-control" name={"linkedinid"} placeholder="LinkedIn Id" value={this.state.linkedinid}
							onChange = {this.eventHandler}/>
						<input type="file" className="form-control" name={"img"} id="img" accept="image/jpg"
							onChange = {(e) => {
								//console.log(e.target.files[0]);
								if(e.target.files[0])
								this.setState({img:e.target.files[0]});
							}} />
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
