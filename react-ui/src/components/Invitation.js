import React, {Component} from 'react'
import Modal from './Modal'
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
    //bind methods
    this.openModal = this.openModal.bind(this)
    this.closeModalAndUpdateUser = this.closeModalAndUpdateUser.bind(this)
  }

  componentDidMount(){
    //ATTENTION! AJAX CALL HERE!
    // axios.get('/api/users')
    //   .then(users => { //setState })
    const users = require('./mock-users.json')
    this.setState({
      users
    })
    //bind methods
    this.openModal = this.openModal.bind(this)
    this.closeModalAndUpdateUser = this.closeModalAndUpdateUser.bind(this)
  }

  openModal(userId){
    this.setState({
      modalIsShown: true,
      modalUserId: userId
    })
  }

  closeModalAndUpdateUser(updatedUser){
    // const {
    //   userId,
    //   password,
    //   dinner,
    //   party,
    //   notGoing
    // } = updatedUser

    // axios.post('/api/confirm',{updatedUser})
    //   .then(serverResponse => {
    //     if(!serverResponse.status === 200) return this.setState({errorMessage: 'Failed updating user'})
    //
    //   })

    //remove Modal, update 'this.state.users' list with new user
    this.setState({
      modalIsShown: false,
      modalUserId: '',
      users: this.state.users.map(u => {
        if(u.userId === updatedUser.userId){
          return {
            ...u,
            dinner: updatedUser.dinner,
            party: updatedUser.party,
            notGoing: updatedUser.notGoing
          }
        }
        return u
      })
    })
  }

  render(){
    const {users, modalIsShown, modalUserId} = this.state
    const dinnerUsers = users.filter(user=>user.dinner)
    const partyUsers = users.filter(user=>user.party)
    const openUsers = users.filter(user=>(!(user.dinner || user.party) && !user.declined))
    return (
      <div>

        {
          modalIsShown &&
          <Modal userId={modalUserId} closeModalAndUpdateUser={this.closeModalAndUpdateUser}/>
        }

        <h4>Dinner</h4>
        <p>The dinner bla bla bla</p>
        <SignedUserList users={dinnerUsers}/>

        <h4>Party</h4>
        <p>Party will be...</p>
        <SignedUserList users={partyUsers}/>

        <h4>Opened requests</h4>
        <p>Please confirm</p>
        <OpenUserList
          users={openUsers}
          openModal={this.openModal}
        />
      </div>
    )
  }

}
