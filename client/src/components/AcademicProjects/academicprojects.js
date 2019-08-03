import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Card, CardHeader, UncontrolledCollapse, CardBody} from 'reactstrap';

class AcademicProjects extends React.Component {
	type = 0;
  state = {
			projectname: "",
			projectduration: "",
			projectguide: "",
			projectdescription: "",
      modal: false,
      editModal: false,
      editIndex: -1
    }

  editToggle = (nan,index) => {
    this.setState(prevState => ({editModal: !prevState.editModal}));
    if(!this.state.editModal) {
      this.setState({
        projectname: nan.projectname,
        projectduration: nan.projectduration,
        projectguide: nan.projectguide,
        projectdescription: nan.projectdescription,
        editIndex: index
      });
    }
    else {
      this.setState({
				projectname: "",
				projectduration: "",
				projectguide: "",
				projectdescription: "",
        editIndex: -1
      });
    }
  }

  toggle = () => {
    this.setState(prevState => ({modal: !prevState.modal}));
    if(!this.state.modal) {
      this.setState({
				projectname: "",
				projectduration: "",
				projectguide: "",
				projectdescription: "",
        editIndex: -1
      });
    }
  }

  eventHandler = (e) => {this.setState({[e.target.name]: e.target.value})}

  submit = (event) => {
    event.preventDefault();
    const body = {
      projectname: this.state.projectname,
      projectduration: this.state.projectduration,
      projectguide: this.state.projectguide,
      projectdescription: this.state.projectdescription
    };
    this.setState({modal:false});
    this.props.submit(this.type,body);
  }

  editFunc = (event, index) => {
    event.preventDefault();
    const body = {
      projectname: this.state.projectname,
      projectduration: this.state.projectduration,
      projectguide: this.state.projectguide,
      projectdescription: this.state.projectdescription
    };
    this.editToggle(body,-1);
    this.props.editFunc(this.type, this.state.editIndex, body);
  }

  render() {
    return(
			<Card>
        <CardHeader>
        <button className="btn btn-link" id="academics">Academic Projects</button>
        </CardHeader>
        <UncontrolledCollapse toggler="#academics"><CardBody>
							<div className="row">
										{
											this.props.fields.length === 0 ? <p>Nothing is Added</p> :
											this.props.fields.map((nan,index,summa)=>{
												return(
													<div className="col-12 col-md-6 col-lg-4" key={"academicproject" + index}>
													<div className="card col-auto">
														<div className="card-header">
															<h3 className="card-title">Academic Project No: {index + 1}</h3>
														</div>
														<div className="card-body text-center">
															<ul className="list-group list-group-flush">
																<li className="list-group-item">
																	<strong>Project Name</strong> : {nan.projectname}
																</li>
																<li className="list-group-item">
																	<strong>Project Duration</strong> : {nan.projectduration}
																</li>
																<li className="list-group-item">
																	<strong>Project Guide</strong> : {nan.projectguide}
																</li>
																<li className="list-group-item">
																	<strong>Project Description</strong> : {nan.projectdescription}
																</li>
															</ul>
															<button className = "btn-danger col-6" onClick={() => this.props.removeFunc(this.type, index)}>Remove</button>

															<button className="btn-info col-6" onClick={() => this.editToggle(nan,index)}>Edit</button>

															<Modal isOpen={this.state.editModal} toggle={()=>this.editToggle({},-1)} className={this.props.className}>
																<ModalHeader toggle={this.editToggle}>Edit the Academic Project</ModalHeader>
																<ModalBody>
																<form onSubmit={(e) => {this.editFunc(e);}} id="editAcademicProject" name="editAcademicProject">
																 <input type="text" className="form-control" name={"projectname"} placeholder="Project Name" value={this.state.projectname}
																	onChange={this.eventHandler}/>
																 <input type="text" className="form-control" name={"projectduration"} placeholder="Duration" value={this.state.projectduration}
																	onChange = {this.eventHandler}/>
																 <input type="text" className="form-control" name={"projectguide"} placeholder="Guide" value={this.state.projectguide}
																	onChange = {this.eventHandler}/>
																 <textarea className="form-control" name={"projectdescription"} placeholder="Description" value={this.state.projectdescription}
																	onChange = {this.eventHandler}/>
																</form>
																</ModalBody>
																<ModalFooter>
																	 <button type="submit" form="editAcademicProject">Submit</button>
																	<Button color="secondary" onClick={() => this.editToggle({},-1)}>Cancel</Button>
																</ModalFooter>
															</Modal>

															</div>
														</div>
													</div>
										);
									})
										}
									<div className="col-12">
									<Button color="primary" onClick={this.toggle}>Add</Button>
							 <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
								 <ModalHeader toggle={this.toggle}>Add an Academic Project</ModalHeader>
								 <ModalBody>
								 <form onSubmit={this.submit} id="academicproject" name="academicproject">
									<input type="text" className="form-control" name={"projectname"} placeholder="Project Name"
									 onChange={this.eventHandler}/>
									<input type="text" className="form-control" name={"projectduration"} placeholder="Duration"
									 onChange = {this.eventHandler}/>
									<input type="text" className="form-control" name={"projectguide"} placeholder="Guide"
									 onChange = {this.eventHandler}/>
									<textarea className="form-control" name={"projectdescription"} placeholder="Description"
									 onChange = {this.eventHandler}/>
								 </form>
								 </ModalBody>
								 <ModalFooter>
										<button type="submit" form="academicproject">Submit</button>
									 <Button color="secondary" onClick={this.toggle}>Cancel</Button>
								 </ModalFooter>
							 </Modal>
							 </div>
							</div>
          </CardBody></UncontrolledCollapse>
        </Card>

    );
  }
}

export default AcademicProjects;
