import React, {Component} from 'react'
import SignedUserList from './SignedUserList'
import OpenUserList from './OpenUserList'

export default class Invitation extends Component {

  constructor(props){
    super(props)
    this.state = {
      users: [],
      modalIsShown: false,
      modalUserId: ''
    }
  }

  componentDidMount(){
    //ATTENTION! AJAX CALL HERE!
    const users = require('./mock-users.json')
    this.setState({
      users
    })
  }

  render(){
    const {users} = this.state
    const dinnerUsers = users.filter(user=>user.dinner)
    const partyUsers = users.filter(user=>user.party)
    const openUsers = users.filter(user=>(!(user.dinner || user.party) && !user.declined))
    return (
      <div>
        <h4>Dinner</h4>
        <p>The dinner bla bla bla</p>
        <SignedUserList users={dinnerUsers}/>

        <h4>Party</h4>
        <p>Party will be...</p>
        <SignedUserList users={partyUsers}/>

        <h4>Opened requests</h4>
        <p>Please confirm</p>
        <OpenUserList users={openUsers}/>
      </div>
    )
  }

}
