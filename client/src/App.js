import React, { Component } from 'react';
import DynamicForm from './components/DynamicForm/form';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <h2 align="center">Resume Generator</h2>
        <DynamicForm
        />
      </div>
    );
  }
}