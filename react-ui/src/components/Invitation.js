import React, {Component} from 'react'
import SignedUserList from './SignedUserList'
import OpenUserList from './OpenUserList'

export default class Invitation extends Component {

  render(){
    return (
      <div>
        <h4>Dinner</h4>
        <p>The dinner bla bla bla</p>
        <SignedUserList />

        <h4>Party</h4>
        <p>Party will be...</p>
        <SignedUserList />

        <h4>Opened requests</h4>
        <p>Please confirm</p>
        <OpenUserList />
      </div>
    )
  }

}
