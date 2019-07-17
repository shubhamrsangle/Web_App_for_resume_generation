import React from 'react';

class Nandha extends React.Component {
  constructor(props) {
    super(props);
  }

/*  toggle = () => {
    this.setState({
      addState: !this.state.addState
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({
      nandhas: [...this.state.nandhas, document.forms["form"]["nandha"].value],
      addState: false
    });
  }
*/
  eventHandler = (event) => {
    this.setState({[event.target.name]:event.target.value});
  }

  submitHandler = (event) => {
    event.preventDefault();
    const body = this.state;
    this.props.submit(body);
  }
  render() {

    return(
      <div className="row">
        <div className="col-12">
          <p>Add a Name</p>
          <ol>
            {
              this.props.nandhas.map((nan)=>{
                return(<li>{nan.toString()}</li>);
              })
            }
          </ol>
          <button onClick={this.props.toggle} className={this.props.addState ? "btn-danger":"btn-primary"}>
              {this.props.addState ? "Cancel":"Add"}
          </button>
          {
            this.props.addState ?
            <React.Fragment>
              <form onSubmit={this.props.submit} id="form">
                <input type="text" name="nandha"/>
                <input type="submit"/>
              </form>
            </React.Fragment>: <React.Fragment></React.Fragment>
          }
        </div>
      </div>
    );
  }
}

export default Nandha;
