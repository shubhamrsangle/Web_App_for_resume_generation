import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Card, CardHeader, UncontrolledCollapse, CardBody} from 'reactstrap';

class HobbiesAndInterests extends React.Component {
  type = 8;
  state = {
      hobby: "",
      modal: false,
      editModal: false,
      editIndex: -1
    }

  editToggle = (nan,index) => {
    this.setState(prevState => ({editModal: !prevState.editModal}));
    if(!this.state.editModal) {
      this.setState({
        hobby: nan.hobby,
        editIndex: index
      });
    }
    else {
      this.setState({
        hobby: "",
        editIndex: -1
      });
    }
  }

  toggle = () => {
    this.setState(prevState => ({modal: !prevState.modal}));
    if(!this.state.modal) {
      this.setState({
        hobby: "",
        editIndex: -1
      });
    }
  }

  eventHandler = (e) => {this.setState({[e.target.name]: e.target.value})}

  submit = (event) => {
    event.preventDefault();
    const body = {
      hobby: this.state.hobby
    };
    this.setState({modal:false});
    this.props.submit(this.type,body);
  }

  editFunc = (event, index) => {
    console.log(this.state.editIndex);
    event.preventDefault();
    const body = {
      hobby: this.state.hobby
    };
    this.editToggle(body,-1);
    this.props.editFunc(this.type, this.state.editIndex, body);
  }

  render() {
    return(
      <Card>
        <CardHeader>
          <button className="btn btn-link" id="hobbiesandinterests">Hobbies And Interests</button>
        </CardHeader>
        <UncontrolledCollapse toggler="#hobbiesandinterests"><CardBody>
          <div className="row">
                {
                  this.props.fields === null ? <p>Nothing is Added</p> :
                  this.props.fields.map((nan,index,summa)=>{
                    return(
                      <div className="col-12 col-md-6 col-lg-4" key={"hobby"+index}>
                      <div className="card col-auto">
                        <div className="card-header">
                          <h3 className="card-title">Hobby Or Interest No:{index + 1}</h3>
                        </div>
                        <div className="card-body text-center">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <strong>Hobby or Interest</strong> : {nan.hobby}
                            </li>
                          </ul>
                          <button className = "btn-danger col-6" onClick={() => this.props.removeFunc(this.type,index)}>Remove</button>

                          <button className="btn-info col-6" onClick={() => this.editToggle(nan,index)}>Edit</button>

                          <Modal isOpen={this.state.editModal} toggle={()=>this.editToggle({},-1)} className={this.props.className}>
                            <ModalHeader toggle={this.editToggle}>Edit the Hobby Or Interest</ModalHeader>
                            <ModalBody>
                            <form onSubmit={(e) => {this.editFunc(e);}} id="editEducation" name="editEducation">
                             <input type="text" className="form-control" name={"hobby"} placeholder="Hobby or Interest" value={this.state.hobby}
                              onChange={this.eventHandler}/>
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
             <ModalHeader toggle={this.toggle}>Add an Hobby Or Interest</ModalHeader>
             <ModalBody>
             <form onSubmit={this.submit} id="hobbiesandinterest" name="hobbiesandinterest">
              <input type="text" className="form-control" name={"hobby"} placeholder="Hobby or Interest"
               onChange={this.eventHandler}/>
             </form>
             </ModalBody>
             <ModalFooter>
                <button type="submit" form="hobbiesandinterest">Submit</button>
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

export default HobbiesAndInterests;
