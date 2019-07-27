import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormCombined from './components/FormCombined/formCombined';

import './App.css';

export default class App extends Component {


  render() {
    return (
      <div className="App">
        <div className="Resume">
          <h2 align="center">Resume Generator</h2>
            {/*<DynamicForm
              />*/}
              <FormCombined />
        </div>
        <div style={{background: '#ccd1c7',margin: '10px', padding: '10px'}} className="Footer">
          <h3 align="center">Created and Designed by</h3>
          <div align="center" className="Names">
            <a href="https://github.com/shubhamrsangle">ShubhamSangle  </a>
            <a href="https://github.com/CS17B011">Deep  </a>
            <a href="https://github.com/nandha1nks">Nandhkumar  </a>
            <a href="https://github.com/me17b016">RajGarg  </a>
            <a href="https://github.com/SaiKrupaReddy20">SaiKrupaReddy  </a>
          </div>
        </div>
      </div>
    );
  }
}
