import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormCombined from './components/FormCombined/formCombined';

import './App.css';

export default class App extends Component {


  render() {
    return (
      <div className="App">
        <h2 align="center">Resume Generator</h2>
        {/*<DynamicForm
          />*/}
          <FormCombined />
        </div>
    );
  }
}
