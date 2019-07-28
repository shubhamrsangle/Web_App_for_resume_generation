import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormCombined from './components/FormCombined/formCombined';

import './App.css';

export default class App extends Component {


  render() {
    return (
      <div className="App">
        <div className="Resume">
        <nav className="navbar navbar-light white">
          <span className="navbar-brand mb-0 h1">Resume Generator</span>
          <a href="https://forms.gle/eAhZ8Yo3crsk3ed88" target="_blank" rel="noopener noreferrer" className="btn btn-danger mr-sm-2" role="button">Report Issue</a>
        </nav>


            {/*<DynamicForm
              />*/}
              <FormCombined />
        </div>
        <div style={{background: '#ccd1c7',margin: '10px', padding: '10px'}} className="footer">
          <h3 align="center">Created and Designed by</h3>
          <div align="center" className="Names">
            <a href="https://github.com/shubhamrsangle">ShubhamSangle  </a>
            <a href="https://github.com/CS17B011">Deep  </a>
            <a href="https://github.com/nandha1nks">Nandhakumar  </a>
            <a href="https://github.com/me17b016">RajGarg  </a>
            <a href="https://github.com/SaiKrupaReddy20">SaiKrupaReddy  </a>
          </div>
        </div>
      </div>
    );
  }
}
