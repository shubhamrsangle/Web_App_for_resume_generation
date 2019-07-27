import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Card, CardHeader, UncontrolledCollapse, CardBody} from 'reactstrap';

class Achievements extends React.Component {
  type = 1;
  state = {
			achievement: "" ,
      modal: false,
      editModal: false,
      editIndex: -1
    }

  editToggle = (nan,index) => {
    this.setState(prevState => ({editModal: !prevState.editModal}));
    if(!this.state.editModal) {
      this.setState({
        achievement: nan.achievement,
        editIndex: index
      });
    }
    else {
      this.setState({
        achievement: "",
        editIndex: -1
      });
    }
  }

  toggle = () => {
    this.setState(prevState => ({modal: !prevState.modal}));
    if(!this.state.modal) {
      this.setState({
        achievement: "",
        editIndex: -1
      });
    }
  }

  eventHandler = (e) => {this.setState({[e.target.name]: e.target.value})}

  submit = (event) => {
    event.preventDefault();
    const body = {
      achievement: this.state.achievement
    };
    this.setState({modal:false});
    this.props.submit(this.type,body);
  }

  editFunc = (event, index) => {
    console.log(this.state.editIndex);
    event.preventDefault();
    const body = {
      achievement: this.state.achievement
    };
    this.editToggle(body,-1);
    this.props.editFunc(this.type, this.state.editIndex, body);
  }

  render() {
    return(
      <Card>
        <CardHeader>
          <button className="btn btn-link" id="achievements">Achievements</button>
        </CardHeader>
        <UncontrolledCollapse toggler="#achievements"><CardBody>
          <div className="row">
                {
                  this.props.fields === null ? <p>Nothing is Added</p> :
                  this.props.fields.map((nan,index,summa)=>{
                    return(
                      <div className="col-12 col-md-6 col-lg-4" key={"achievement" +index}>
                      <div className="card col-auto">
                        <div className="card-header">
                          <h3 className="card-title">Achievement No: {index + 1}</h3>
                        </div>
                        <div className="card-body text-center">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <strong>Achievement</strong> : {nan.achievement}
                            </li>
                          </ul>
                          <button className = "btn-danger col-6" onClick={() => this.props.removeFunc(this.type,index)}>Remove</button>

                          <button className="btn-info col-6" onClick={() => this.editToggle(nan,index)}>Edit</button>

                          <Modal isOpen={this.state.editModal} toggle={()=>this.editToggle({},-1)} className={this.props.className}>
                            <ModalHeader toggle={this.editToggle}>Edit the Achievement</ModalHeader>
                            <ModalBody>
                            <form onSubmit={(e) => {this.editFunc(e);}} id="editAchievement" name="editAchievement">
                             <input type="text" className="form-control" name={"achievement"} placeholder="Achievement" value={this.state.achievement}
                              onChange={this.eventHandler}/>
                            </form>
                            </ModalBody>
                            <ModalFooter>
                               <button type="submit" form="editAchievement">Submit</button>
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
             <ModalHeader toggle={this.toggle}>Add an Achievement</ModalHeader>
             <ModalBody>
             <form onSubmit={this.submit} id="achievement" name="achievement">
              <input type="text" className="form-control" name={"achievement"} placeholder="Achievement"
               onChange={this.eventHandler}/>
             </form>
             </ModalBody>
             <ModalFooter>
                <button type="submit" form="achievement">Submit</button>
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

export default Achievements;
