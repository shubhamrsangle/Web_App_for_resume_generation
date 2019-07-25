import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Card, CardHeader, UncontrolledCollapse, CardBody} from 'reactstrap';

class Experience extends React.Component {
  type = 6;
  state = {
      experience: "",
      expduration: "",
      expguide: "",
      expdescription: "",
      modal: false,
      editModal: false,
      editIndex: -1
    }

  editToggle = (nan,index) => {
    this.setState(prevState => ({editModal: !prevState.editModal}));
    if(!this.state.editModal) {
      this.setState({
        experience: nan.experience,
        expduration: nan.expduration,
        expguide: nan.expguide,
        expdescription: nan.expdescription,
        editIndex: index
      });
    }
    else {
      this.setState({
        experience: "",
        expduration: "",
        expguide: "",
        expdescription: "",
        editIndex: -1
      });
    }
  }

  toggle = () => {
    this.setState(prevState => ({modal: !prevState.modal}));
    if(!this.state.modal) {
      this.setState({
        experience: "",
        expduration: "",
        expguide: "",
        expdescription: "",
        editIndex: -1
      });
    }
  }

  eventHandler = (e) => {this.setState({[e.target.name]: e.target.value})}

  submit = (event) => {
    event.preventDefault();
    const body = {
      experience: this.state.experience,
      expduration: this.state.expduration,
      expguide: this.state.expguide,
      expdescription: this.state.expdescription
    };
    this.setState({modal:false});
    this.props.submit(this.type,body);
  }

  editFunc = (event, index) => {
    console.log(this.state.editIndex);
    event.preventDefault();
    const body = {
      experience: this.state.experience,
      expduration: this.state.expduration,
      expguide: this.state.expguide,
      expdescription: this.state.expdescription
    };
    this.editToggle(body,-1);
    this.props.editFunc(this.type, this.state.editIndex, body);
  }

  render() {
    return(
      <Card>
        <CardHeader>
          <button className="btn btn-link" id="experiences">Experiences</button>
        </CardHeader>
        <UncontrolledCollapse toggler="#experiences"><CardBody>
          <div className="row">
                {
                  this.props.fields.length === 0 ? <p>Nothing is Added</p> :
                  this.props.fields.map((nan,index,summa)=>{
                    return(
                      <div className="col-12 col-md-6 col-lg-4" key={"experience"+index}>
                      <div className="card col-auto">
                        <div className="card-header">
                          <h3 className="card-title">Experience No:{index + 1}</h3>
                        </div>
                        <div className="card-body text-center">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <strong>Experience</strong> : {nan.experience}
                            </li>
                            <li className="list-group-item">
                              <strong>Experience Duration</strong> : {nan.expduration}
                            </li>
                            <li className="list-group-item">
                              <strong>Guide</strong> : {nan.expguide}
                            </li>
                            <li className="list-group-item">
                              <strong>Description</strong> : {nan.expdescription}
                            </li>
                          </ul>
                          <button className = "btn-danger col-6" onClick={() => this.props.removeFunc(this.type,index)}>Remove</button>

                          <button className="btn-info col-6" onClick={() => this.editToggle(nan,index)}>Edit</button>

                          <Modal isOpen={this.state.editModal} toggle={()=>this.editToggle({},-1)} className={this.props.className}>
                            <ModalHeader toggle={this.editToggle}>Edit the Experience</ModalHeader>
                            <ModalBody>
                            <form onSubmit={(e) => {this.editFunc(e);}} id="editExperience" name="editExperience">
                             <input type="text" className="form-control" name={"experience"} placeholder="Experience" value={this.state.experience}
                              onChange={this.eventHandler}/>
                             <input type="text" className="form-control" name={"expduration"} placeholder="Experience Duration" value={this.state.expduration}
                              onChange = {this.eventHandler}/>
                             <input type="text" className="form-control" name={"expguide"} placeholder="Guide" value={this.state.expguide}
                              onChange = {this.eventHandler}/>
                             <textarea className="form-control" name={"expdescription"} placeholder="Experience Discription" value={this.state.expdescription}
                              onChange = {this.eventHandler}/>
                            </form>
                            </ModalBody>
                            <ModalFooter>
                               <button type="submit" form="editExperience">Submit</button>
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
             <ModalHeader toggle={this.toggle}>Add an Experience</ModalHeader>
             <ModalBody>
             <form onSubmit={this.submit} id="experience" name="experience">
              <input type="text" className="form-control" name={"experience"} placeholder="Experience"
               onChange={this.eventHandler}/>
              <input type="text" className="form-control" name={"expduration"} placeholder="Experience Duration"
               onChange = {this.eventHandler}/>
              <input type="text" className="form-control" name={"expguide"} placeholder="Guide"
               onChange = {this.eventHandler}/>
              <textarea className="form-control" name={"expdescription"} placeholder="Experience Description"
               onChange = {this.eventHandler}/>
             </form>
             </ModalBody>
             <ModalFooter>
                <button type="submit" form="experience">Submit</button>
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

export default Experience;
