import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Card, CardHeader, UncontrolledCollapse, CardBody} from 'reactstrap';

class EducationDetails extends React.Component {
  type = 5;
  state = {
      programme: "",
      institute: "",
      year: "",
      marks: "",
      modal: false,
      editModal: false,
      editIndex: -1
    }

  editToggle = (nan,index) => {
    this.setState(prevState => ({editModal: !prevState.editModal}));
    if(!this.state.editModal) {
      this.setState({
        programme: nan.programme,
        institute: nan.institute,
        year: nan.year,
        marks: nan.marks,
        editIndex: index
      });
    }
    else {
      this.setState({
        programme: "",
        institute: "",
        year: "",
        marks: "",
        editIndex: -1
      });
    }
  }

  toggle = () => {
    this.setState(prevState => ({modal: !prevState.modal}));
    if(!this.state.modal) {
      this.setState({
        programme: "",
        institute: "",
        year: "",
        marks: "",
        editIndex: -1
      });
    }
  }

  eventHandler = (e) => {this.setState({[e.target.name]: e.target.value})}

  submit = (event) => {
    event.preventDefault();
    const body = {
      programme: this.state.programme,
      institute: this.state.institute,
      year: this.state.year,
      marks: this.state.marks
    };
    this.setState({modal:false});
    this.props.submit(this.type,body);
  }

  editFunc = (event, index) => {
    console.log(this.state.editIndex);
    event.preventDefault();
    const body = {
      programme: this.state.programme,
      institute: this.state.institute,
      year: this.state.year,
      marks: this.state.marks
    };
    this.editToggle(body,-1);
    this.props.editFunc(this.type, this.state.editIndex, body);
  }

  render() {
    return(
      <Card>
        <CardHeader>
          <button className="btn btn-link" id="educations">Education Details</button>
        </CardHeader>
        <UncontrolledCollapse toggler="#educations"><CardBody>
          <div className="row">
                {
                  this.props.fields.length === 0 ? <p>Nothing is Added</p> :
                  this.props.fields.map((nan,index,summa) =>{
                    return(
                      <div className="col-12 col-md-6 col-lg-4" key={"education"+index}>
                      <div className="card col-auto">
                        <div className="card-header">
                          <h3 className="card-title">Education Detail No:{index + 1}</h3>
                        </div>
                        <div className="card-body text-center">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <strong>Programme</strong> : {nan.programme}
                            </li>
                            <li className="list-group-item">
                              <strong>Institute</strong> : {nan.institute}
                            </li>
                            <li className="list-group-item">
                              <strong>Year</strong> : {nan.year}
                            </li>
                            <li className="list-group-item">
                              <strong>Marks</strong> : {nan.marks}
                            </li>
                          </ul>
                          <button className = "btn-danger col-6" onClick={() => this.props.removeFunc(this.type,index)}>Remove</button>

                          <button className="btn-info col-6" onClick={() => this.editToggle(nan,index)}>Edit</button>

                          <Modal isOpen={this.state.editModal} toggle={() =>this.editToggle({},-1)} className={this.props.className}>
                            <ModalHeader toggle={this.editToggle}>Edit the Education Detail</ModalHeader>
                            <ModalBody>
                            <form onSubmit={(e) => {this.editFunc(e);}} id="editEducation" name="editEducation">
                             <input type="text" className="form-control" name={"programme"} placeholder="Programme" value={this.state.programme}
                              onChange={this.eventHandler}/>
                             <input type="text" className="form-control" name={"institute"} placeholder="Institute" value={this.state.institute}
                              onChange = {this.eventHandler}/>
                             <input type="text" className="form-control" name={"year"} placeholder="Year" value={this.state.year}
                              onChange = {this.eventHandler}/>
                             <input type="text" className="form-control" name={"marks"} placeholder="%/CGPA" value={this.state.marks}
                              onChange = {this.eventHandler}/>
                            </form>
                            </ModalBody>
                            <ModalFooter>
                               <button type="submit" form="editEducation">Submit</button>
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
             <ModalHeader toggle={this.toggle}>Add an Education Detail</ModalHeader>
             <ModalBody>
             <form onSubmit={this.submit} id="education" name="education">
              <input type="text" className="form-control" name={"programme"} placeholder="Programme"
               onChange={this.eventHandler}/>
              <input type="text" className="form-control" name={"institute"} placeholder="Institute"
               onChange = {this.eventHandler}/>
              <input type="text" className="form-control" name={"year"} placeholder="Year"
               onChange = {this.eventHandler}/>
              <input type="text" className="form-control" name={"marks"} placeholder="%/CGPA"
               onChange = {this.eventHandler}/>
             </form>
             </ModalBody>
             <ModalFooter>
                <button type="submit" form="education">Submit</button>
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

export default EducationDetails;
