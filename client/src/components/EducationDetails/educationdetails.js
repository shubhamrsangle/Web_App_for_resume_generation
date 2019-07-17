import React from 'react';

class Nandha extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
				programme: "",
				institute: "",
				year: "",
				marks: ""
			}
  }

  eventHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submit = (event) => {
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
              this.props.fields.map((nan)=>{
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
              <form onSubmit={this.submit} id="experience">
              <input type="text" className="form-control" name={"programme"} placeholder="Programme"
							  onChange={this.eventHandler}/>
              <input type="text" className="form-control" name={"institute"} placeholder="Institute"
                onChange = {this.eventHandler}/>
              <input type="text" className="form-control" name={"year"} placeholder="Year"
                onChange = {this.eventHandler}/>
              <input type="text" className="form-control" name={"marks"} placeholder="%/CGPA"
                onChange = {this.eventHandler}/>
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
