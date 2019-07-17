import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Nandha extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
				programme: "",
				institute: "",
				year: "",
				marks: "",
        modal: false
			}
  }

  toggle = () => {
    this.setState(prevState => ({modal: !prevState.modal}));
  }

  eventHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  submit = (event) => {
    event.preventDefault();
    const body = this.state;
    this.setState({modal:false});
    this.props.submit(body);
  }

  render() {

    return(
      <div className="row">
        <div className="col-12">
          <ol>
            {
              this.props.fields.map((nan,index)=>{
                return(
                  <div className="card" key={index}>
                    <div className="card-header">
                      <p>Experience No:{index}</p>
                    </div>
                    <div className="card-body">
                      <p>{nan.programme}</p>
                      <button onClick={() => {console.log("done");
                        this.props.removeFunc(0);
                        console.log("done Again");
                    }}>
                        Remove
                      </button>
                    </div>
                  </div>
            );
              })
            }
          </ol>
          <div>
          <Button color="primary" onClick={this.toggle}>Add</Button>
       <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
         <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
         <ModalBody>
         <form onSubmit={this.submit} id="experience" name="experience">
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
            <button type="submit" form="experience">Submit</button>
           <Button color="secondary" onClick={this.toggle}>Cancel</Button>
         </ModalFooter>
       </Modal>
       </div>
        </div>
      </div>
    );
  }
}

export default Nandha;
