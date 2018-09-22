import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './components/header/Header';
import './App.css';
import './style/main.css';
import Dashboard from './dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Dashboard />
      </div>
    );
  }
}

export default App;
