import React, {Component} from 'react'
import axios from 'axios'
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
    // const users = require('./mock-users.json')
    // this.setState({
    //   users: users
    // })
    axios.get('/api/users')
      .then(serverResponse => {
        this.setState({
          users: serverResponse.data.users
        })
      })
  }

  openModal(userId){
    this.setState({
      modalIsShown: true,
      modalUserId: userId
    })
  }

  closeModalAndUpdateUser(updatedUser){
    // const {userId, confirmationCode, dinner, party, notGoing} = updatedUser

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
            declined: updatedUser.declined
          }
        }
        return u
      })
    })


    // axios.post('/api/confirmation',{updatedUser})
    //   .then(serverResponse => {
    //     if(!serverResponse.status === 200) return this.setState({errorMessage: 'Failed updating user'})
    //
    //     //remove Modal, update 'this.state.users' list with new user
    //     this.setState({
    //       modalIsShown: false,
    //       modalUserId: '',
    //       users: this.state.users.map(u => {
    //         if(u.userId === updatedUser.userId){
    //           return {
    //             ...u,
    //             dinner: updatedUser.dinner,
    //             party: updatedUser.party,
    //             declined: updatedUser.declined
    //           }
    //         }
    //         return u
    //       })
    //     })
    //   })
  }

  render(){
    const {users, modalIsShown, modalUserId} = this.state
    const dinnerUsers = users.length && users.filter(user=>user.dinner)
    const partyUsers = users.length && users.filter(user=>user.party)
    const openUsers = users.length && users.filter(user=>(!(user.dinner || user.party) && !user.declined))
    return (
      <div>

        {
          modalIsShown &&
          <Modal userId={modalUserId} closeModalAndUpdateUser={this.closeModalAndUpdateUser}/>
        }

        <h4>Dinner</h4>
        <p>The dinner bla bla bla</p>
        {
          dinnerUsers &&
          <SignedUserList users={dinnerUsers}/>
        }

        <h4>Party</h4>
        <p>Party will be...</p>
        {
          partyUsers &&
          <SignedUserList users={partyUsers}/>
        }

        <h4>Opened requests</h4>
        <p>Please confirm</p>
        {
          openUsers &&
          <OpenUserList
            users={openUsers}
            openModal={this.openModal}
          />
        }
      </div>
    )
  }

}
