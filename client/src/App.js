import React, { Component } from 'react';
import './App.scss';
import Chat from './Chat';

class App extends Component {
  render() {
    return (
      <div id="test" className="wrapper">
        <Chat />
      </div>
    );
  }
}

export default App;
