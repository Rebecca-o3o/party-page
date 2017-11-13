import React, { Component } from 'react'
import Invitation from './components/Invitation'


class App extends Component {

  render() {
    return (
      <div className="App">

        <h1>Welcome to the birthday party of Rebecca and Loris!</h1>
        <h3>8th December 2017</h3>

        <Invitation />

      </div>
    );
  }
}

export default App;
