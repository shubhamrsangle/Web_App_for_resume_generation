import React, { Component } from 'react';
import DynamicForm from './components/DynamicForm';

import './App.css';

export default class App extends Component 
{
  render() 
  {
    return 
    (
      <div className="App">
        <DynamicForm 
          title = "Resume Generator"
        />
      </div>
    )
  }
}