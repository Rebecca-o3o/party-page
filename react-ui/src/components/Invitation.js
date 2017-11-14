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
    axios.get('/api/users')
      .then(serverResponse => {
        this.setState({
          users: serverResponse.data.users
        })
      })
      .catch(e =>
        this.setState({errorMessage: 'Error getting users from database'})
      )
  }

  openModal(userId){
    this.setState({
      modalIsShown: true,
      modalUserId: userId
    })
  }

  closeModalAndUpdateUser(updatedUser){
    // const {userId, confirmationCode, dinner, party, declined} = updatedUser
    axios.post('/api/confirmation',{...updatedUser})
      .then(serverResponse => {
        if(serverResponse.status !== 200) throw new Error('Updating failed')

        //remove Modal, update 'this.state.users' list with new user
        this.setState({
          errorMessage: '',
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
      })
      .catch(e =>
        this.setState({errorMessage: 'Wrong Confirmation Code. Please try again!'})
      )
  }

  render(){
    const {errorMessage, users, modalIsShown, modalUserId} = this.state
    const dinnerUsers = users.length && users.filter(user=>user.dinner)
    const partyUsers = users.length && users.filter(user=>user.party)
    const openUsers = users.length && users.filter(user=>(!(user.dinner || user.party) && !user.declined))

    return (
      <div>

        {errorMessage && <h6 className="error-message">{errorMessage}</h6>}

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
