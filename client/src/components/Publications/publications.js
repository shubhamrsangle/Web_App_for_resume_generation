import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Card, CardHeader, UncontrolledCollapse, CardBody} from 'reactstrap';

class Publications extends React.Component {
  type = 10;
  state = {
      pubtitle: "",
      pubauthors: "",
      pubplace: "",
      pubdoi: "",
      pubdescription: "",
      modal: false,
      editModal: false,
      editIndex: -1
    }

  editToggle = (nan,index) => {
    this.setState(prevState => ({editModal: !prevState.editModal}));
    if(!this.state.editModal) {
      this.setState({
        pubtitle: nan.pubtitle,
        pubauthors: nan.pubauthors,
        pubplace: nan.pubplace,
        pubdoi: nan.pubdoi,
        pubdescription: nan.pubdescription,
        editIndex: index
      });
    }
    else {
      this.setState({
        pubtitle: "",
        pubauthors: "",
        pubplace: "",
        pubdoi: "",
        pubdescription: "",
        editIndex: -1
      });
    }
  }

  toggle = () => {
    this.setState(prevState => ({modal: !prevState.modal}));
    if(!this.state.modal) {
      this.setState({
        pubtitle: "",
        pubauthors: "",
        pubplace: "",
        pubdoi: "",
        pubdescription: "",
        editIndex: -1
      });
    }
  }

  eventHandler = (e) => {this.setState({[e.target.name]: e.target.value})}

  submit = (event) => {
    event.preventDefault();
    const body = {
      pubtitle: this.state.pubtitle,
      pubauthors: this.state.pubauthors,
      pubplace: this.state.pubplace,
      pubdoi: this.state.pubdoi,
      pubdescription: this.state.pubdescription
    };
    this.setState({modal:false});
    this.props.submit(this.type,body);
  }

  editFunc = (event, index) => {
    event.preventDefault();
    const body = {
      pubtitle: this.state.pubtitle,
      pubauthors: this.state.pubauthors,
      pubplace: this.state.pubplace,
      pubdoi: this.state.pubdoi,
      pubdescription: this.state.pubdescription
    };
    this.editToggle(body,-1);
    this.props.editFunc(this.type, this.state.editIndex, body);
  }

  render() {
    return(
      <Card>
        <CardHeader>
          <button className="btn btn-link" id="publications">Publications</button>
        </CardHeader>
        <UncontrolledCollapse toggler="#publications"><CardBody>
          <div className="row">
                {
                  this.props.fields.length === 0 ? <p>Nothing is Added</p> :
                  this.props.fields.map((nan,index,summa)=>{
                    return(
                      <div className="col-12 col-md-6 col-lg-4" key={"publication"+index}>
                      <div className="card col-auto">
                        <div className="card-header">
                          <h3 className="card-title">Publication No:{index + 1}</h3>
                        </div>
                        <div className="card-body text-center">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <strong>Publication Title</strong> : {nan.pubtitle}
                            </li>
                            <li className="list-group-item">
                              <strong>Authors</strong> : {nan.pubauthors}
                            </li>
                            <li className="list-group-item">
                              <strong>Publication Place</strong> : {nan.pubplace}
                            </li>
                            <li className="list-group-item">
                              <strong>Publication DOI</strong> : {nan.pubdoi}
                            </li>
                            <li className="list-group-item">
                              <strong>Description</strong> : {nan.pubdescription}
                            </li>
                          </ul>
                          <button className = "btn-danger col-6" onClick={() => this.props.removeFunc(this.type,index)}>Remove</button>

                          <button className="btn-info col-6" onClick={() => this.editToggle(nan,index)}>Edit</button>

                          <Modal isOpen={this.state.editModal} toggle={()=>this.editToggle({},-1)} className={this.props.className}>
                            <ModalHeader toggle={this.editToggle}>Edit the Publication</ModalHeader>
                            <ModalBody>
                            <form onSubmit={(e) => {this.editFunc(e);}} id="editPublication" name="editPublication">
                             <input type="text" className="form-control" name={"pubtitle"} placeholder="Publication Title" value={this.state.pubtitle}
                              onChange={this.eventHandler}/>
                            <input type="text" className="form-control" name={"pubauthors"} placeholder="Publication Authors" value={this.state.pubauthors}
                             onChange={this.eventHandler}/>
                             <input type="text" className="form-control" name={"pubplace"} placeholder="Publication Place" value={this.state.pubplace}
                              onChange = {this.eventHandler}/>
                              <input type="text" className="form-control" name={"pubdoi"} placeholder="Publication DOI" value={this.state.pubdoi}
                               onChange={this.eventHandler}/>
                             <textarea className="form-control" name={"pubdescription"} placeholder="Description" value={this.state.pubdescription}
                              onChange = {this.eventHandler}/>
                            </form>
                            </ModalBody>
                            <ModalFooter>
                               <button type="submit" form="editPublication">Submit</button>
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
             <ModalHeader toggle={this.toggle}>Add an Publication</ModalHeader>
             <ModalBody>
             <form onSubmit={this.submit} id="publication" name="publication">
              <input type="text" className="form-control" name={"pubtitle"} placeholder="Publication Title"
               onChange={this.eventHandler}/>
             <input type="text" className="form-control" name={"pubauthors"} placeholder="Publication Authors"
              onChange = {this.eventHandler}/>
              <input type="text" className="form-control" name={"pubplace"} placeholder="Publication Place"
               onChange = {this.eventHandler}/>
               <input type="text" className="form-control" name={"pubdoi"} placeholder="Publication DOI"
                onChange = {this.eventHandler}/>
              <textarea className="form-control" name={"pubdescription"} placeholder="Description"
               onChange = {this.eventHandler}/>
             </form>
             </ModalBody>
             <ModalFooter>
                <button type="submit" form="publication">Submit</button>
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

export default Publications;
