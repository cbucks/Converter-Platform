import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import '../style.css';
import hot from '../utilities/Hottify';
import Development from 'Development';
import HeaderComponent from './Header';
import ConverterComponent from './Converter';

class App extends Component {
  render() {
    return (
      <div className="parent-container">
        <HeaderComponent />
        <ConverterComponent />
      </div>
      // <h1> {Development.clientSecret} </h1>
    );
  }
}

export default hot(App);