import React , {Component,Fragment} from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';

export default class basic extends Component {

	type = 3;

	constructor(props){
		super(props);
		this.state = {
			modal: false,
			name: "",
			degree: "",
			photo: "",
			linkedinid: "",
			img: null,
			percentageLoaded: 0
		}
		const basicLocal = JSON.parse(localStorage.getItem('basic'));
		if(basicLocal)
		{
			if(basicLocal.name)
				this.state.name = basicLocal.name;
			if(basicLocal.degree)
				this.state.degree = basicLocal.degree;
			if(basicLocal.linkedinid)
				this.state.linkedinid = basicLocal.linkedinid;
		}
		if(localStorage.getItem('currentFile'))
			this.state.photo = localStorage.getItem('currentFile');
	}

	eventHandler = (e) => {
		this.setState({[e.target.name]: e.target.value})}

	toggle = () => {
		this.setState({modal: !this.state.modal});
	}

  submit = async (event) => {
		event.preventDefault();
		this.toggle();

		if (this.state.img !== null) {
			this.props.imageUploading(false, true);
			const formData = new FormData();
	        formData.append(localStorage.getItem("photoName"),this.state.img);
	        const config = {
	            headers: {
	                'content-type': 'multipart/form-data'
	            },
							onUploadProgress: progressEvent => {
								this.setState({per: parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))});
							}
	        };

					if(localStorage.getItem("currentFile"))
					{
						await axios.post("/serverport/removePhotoSync", {currentFile: localStorage.getItem("currentFile")})
						.then( async (response) => {
							//console.log("Success");
						})
						.catch((err) => {});
					}
						await axios.post("/serverport/upload",formData, config)
								.then((response) => {
									//console.log(response.data.currentFile);
									this.setState({photo: response.data.currentFile});
									localStorage.setItem("currentFile",response.data.currentFile);
									this.setState({img:null});
								}).catch((error) => {
									alert("File not uploaded... Try again  "+error);
									this.setState({img:null});
						});


		}

		const body = {
			name: this.state.name,
			degree: this.state.degree,
			linkedinid: this.state.linkedinid,
			photo: this.state.photo
		};
    this.props.submit(this.type, body);
		this.props.imageUploading(false, false);
  }

	render() {
		return (
			<Fragment>
				{
					this.props.fields === {} ? <React.Fragment></React.Fragment>:
						<Fragment>
						<div className="col-12 col-md-6">
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
										<strong>Degree</strong> : {this.props.fields.degree}
									</li>
									<li className="list-group-item">
										<strong>LinkedIn Id</strong> : {this.props.fields.linkedinid}
									</li>
								</ul>
								</div>
								<div className="col-6 align-self-center">
								<figure className="figure">
										{this.props.imageUploading(true) ? <Progress striped colored="success" value={this.state.per} /> : <React.Fragment></React.Fragment>}
										<img className="figure-img rounded mx-auto d-block" width="70%" height="auto" id="passportPhoto"
											src={this.state.photo ? "/serverport/imgFile/"+localStorage.getItem("currentFile")+"?"+Date.now():"/serverport/imgFile/noProfilePic.jpg"} alt="No Profile Pic" />
									<figcaption className="text-center figure-caption ">
										{this.state.photo ? "Passport Size Photo" : "Add Your Photo"}
									</figcaption>
								</figure>
								{
									this.state.photo === "" ? <React.Fragment></React.Fragment> :
									 	<React.Fragment>
											<button className="btn-danger" onClick={() => {
												this.props.imageUploading(false);
												const configs = {
													onUploadProgress: progressEvent => {
														this.setState({per: parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))});
													}
												}

												axios.post('/serverport/removePhoto',{currentFile: localStorage.getItem("currentFile")},configs)
												.then((response) => {
													this.setState({
														photo: ""
													});
													localStorage.removeItem("currentFile");
													this.props.imageUploading(false, false);
												}).catch((error) => {
													localStorage.removeItem("currentFile");
													alert("Photo could not be removed... Try again" + error);
													this.props.imageUploading(false, false);
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
						 <input type="text" className="form-control" name={"degree"} placeholder="B.Tech in Computer Science and Engineering" value={this.state.degree}
							onChange={this.eventHandler}/>
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
							 <button type="submit" form="basicForm" disabled={this.props.imageUploading(true)}>Submit</button>
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					</Modal>
					</Fragment>
				}
			</Fragment>
		);
	}
}
