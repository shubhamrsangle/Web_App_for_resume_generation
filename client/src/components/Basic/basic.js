import React , {Component,Fragment} from 'react';

export default class basic extends Component {
	render() {
		return (
			<Fragment>
			<div className="form-inline" style={{padding: '10px 10px',margin:'5px 5px'}}>
				<input type="text" className="form-control" name="name" placeholder="Name"/>
				<input type="email" className="form-control" name="email" placeholder="College Email-id"/>
			</div>
			<div className="form-inline" style={{padding: '10px 10px',margin:'5px 5px'}}>
				<label className="radio-inline"><input type="radio" name="optradio" defaultChecked/>B.Tech</label>
				<label className="radio-inline"><input type="radio" name="optradio"/>M.Tech</label>	
				<input type="text" className="form-control" name="linkdinid" placeholder="Linkedin id"/>
			</div>
			</Fragment>
		);
	}
}