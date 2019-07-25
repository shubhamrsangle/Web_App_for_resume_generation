import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Card, CardHeader, UncontrolledCollapse, CardBody} from 'reactstrap';

class TechnicalProficiencies extends React.Component {
  type = 11;
  state = {
      title: "",
      titlevalue: "",
      modal: false,
      editModal: false,
      editIndex: -1
    }

  editToggle = (nan,index) => {
    this.setState(prevState => ({editModal: !prevState.editModal}));
    if(!this.state.editModal) {
      this.setState({
        title: nan.title,
        titlevalue: nan.titlevalue,
        editIndex: index
      });
    }
    else {
      this.setState({
        title: "",
        titlevalue: "",
        editIndex: -1
      });
    }
  }

  toggle = () => {
    this.setState(prevState => ({modal: !prevState.modal}));
    if(!this.state.modal) {
      this.setState({
        title: "",
        titlevalue: "",
        editIndex: -1
      });
    }
  }

  eventHandler = (e) => {this.setState({[e.target.name]: e.target.value})}

  submit = (event) => {
    event.preventDefault();
    const body = {
      title: this.state.title,
      titlevalue: this.state.titlevalue
    };
    this.setState({modal:false});
    this.props.submit(this.type,body);
  }

  editFunc = (event, index) => {
    console.log(this.state.editIndex);
    event.preventDefault();
    const body = {
      title: this.state.title,
      titlevalue: this.state.titlevalue
    };
    this.editToggle(body,-1);
    this.props.editFunc(this.type, this.state.editIndex, body);
  }

  render() {
    return(
      <Card>
        <CardHeader>
          <button className="btn btn-link" id="technicalproficiencies">Technical Proficiencies</button>
        </CardHeader>
        <UncontrolledCollapse toggler="#technicalproficiencies"><CardBody>
          <div className="row">
                {
                  this.props.fields.length === 0 ? <p>Nothing is Added</p> :
                  this.props.fields.map((nan,index,summa)=>{
                    return(
                      <div className="col-12 col-md-6 col-lg-4" key={"technicalproficiency"+index}>
                      <div className="card col-auto">
                        <div className="card-header">
                          <h3 className="card-title">Technical Proficiency No:{index + 1}</h3>
                        </div>
                        <div className="card-body text-center">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <strong>Title</strong> : {nan.title}
                            </li>
                            <li className="list-group-item">
                              <strong>Value</strong> : {nan.titlevalue}
                            </li>
                          </ul>
                          <button className = "btn-danger col-6" onClick={() => this.props.removeFunc(this.type,index)}>Remove</button>

                          <button className="btn-info col-6" onClick={() => this.editToggle(nan,index)}>Edit</button>

                          <Modal isOpen={this.state.editModal} toggle={()=>this.editToggle({},-1)} className={this.props.className}>
                            <ModalHeader toggle={this.editToggle}>Edit the Technical Proficiency</ModalHeader>
                            <ModalBody>
                            <form onSubmit={(e) => {this.editFunc(e);}} id="editTechinicalProficiecy" name="editTechinicalProficiecy">
                             <input type="text" className="form-control" name={"title"} placeholder="Title" value={this.state.title}
                              onChange={this.eventHandler}/>
                             <input type="text" className="form-control" name={"titlevalue"} placeholder="Value" value={this.state.titlevalue}
                              onChange = {this.eventHandler}/>
                            </form>
                            </ModalBody>
                            <ModalFooter>
                               <button type="submit" form="editTechinicalProficiecy">Submit</button>
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
             <ModalHeader toggle={this.toggle}>Add an Technical Proficiency</ModalHeader>
             <ModalBody>
             <form onSubmit={this.submit} id="technicalproficiency" name="technicalproficiency">
              <input type="text" className="form-control" name={"title"} placeholder="Title"
               onChange={this.eventHandler}/>
              <input type="text" className="form-control" name={"titlevalue"} placeholder="Value"
               onChange = {this.eventHandler}/>
             </form>
             </ModalBody>
             <ModalFooter>
                <button type="submit" form="technicalproficiency">Submit</button>
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

export default TechnicalProficiencies;
