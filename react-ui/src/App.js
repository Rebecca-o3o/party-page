import React, { Component } from 'react'
import Invitation from './components/Invitation'
import faces from './images/faces.png'


class App extends Component {

  render() {
    return (
      <div className="App">

        <div className="welcome">

          <div className="bg-img"></div>
          <h1 className="page-title">You are invited to Rebeccas and Loris Birthday Party!</h1>
          <h3 className="page-title">on Friday 8<sup>th</sup> December 2017</h3>
          <img src={faces} id="faces" alt="Loris and Rebecca"/>

        </div>

        <Invitation />

      </div>
    )
  }
}

export default App
