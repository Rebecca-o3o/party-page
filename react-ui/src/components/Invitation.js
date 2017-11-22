import React, {Component} from 'react'
import axios from 'axios'
import Modal from './Modal'
import SignedUserList from './SignedUserList'
import OpenUserList from './OpenUserList'

import '../inner.css'

export default class Invitation extends Component {

  constructor(props){
    super(props)
    this.state = {
      users: [],
      modalIsShown: false,
      modalUser: {
        userId: '',
        name: ''
      }
    }
    //bind methods
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.closeModalAndUpdateUser = this.closeModalAndUpdateUser.bind(this)
  }

  async componentDidMount(){
    try {
      const {data} = await axios.get('/api/users')
      this.setState({
        users: data.users
      })
    } catch(e){
      this.setState({errorMessage: 'Error getting users from database'})
    }
  }

  openModal(user){
    this.setState({
      modalIsShown: true,
      modalUser: user
    })
  }

  closeModal(){
    this.setState({
      modalIsShown: false,
      modalUser: {
        userId: '',
        name: ''
      }
    })
  }

  async closeModalAndUpdateUser(updatedUser){
    try {
      //const {userId, confirmationCode, dinner, party, declined} = updatedUser

      //send updated user data to server
      const serverResponse = await axios.post('/api/confirmation', {...updatedUser})

      if(serverResponse.status !== 200) throw new Error('Updating failed')

      //remove Modal and update 'this.state.users' with new user
      this.setState({
        errorMessage: '',
        modalIsShown: false,
        modalUser: {
          userId: '',
          name: ''
        },
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
    } catch(e){
      this.setState({errorMessage: 'Wrong Confirmation Code. Please try again!'})
    }
  }

  render(){
    const {errorMessage, users, modalIsShown, modalUser} = this.state
    const dinnerUsers = users.length && users.filter(user=>user.dinner)
    const partyUsers = users.length && users.filter(user=>user.party)
    const openUsers = users.length && users.filter(user=>(!(user.dinner || user.party) && !user.declined))

    return (
      <div className="invitation">

        {errorMessage && <h6 className="error-message">{errorMessage}</h6>}

        {
          modalIsShown &&
          <Modal
            user={modalUser}
            closeModal={this.closeModal}
            closeModalAndUpdateUser={this.closeModalAndUpdateUser}/>
        }

        <div className="schedule schedule--dinner">
          <h4 className="schedule__pre">WHAT WE'LL DO FOR..</h4>
          <h3 className="schedule__title">DINNER!</h3>

          <h5 className="schedule__quest">WHEN:</h5>
          <p className="schedule__ans">at 19.30</p>
          <br/>

          <h5 className="schedule__quest">WHERE:</h5>
          <p className="schedule__ans">at Barbarican Restauran, 177 PostdamerPlatz</p>
          <br/>

          <h5 className="schedule__quest">WHO:</h5>
          {
            dinnerUsers &&
            <SignedUserList users={dinnerUsers}/>
          }
        </div>


        <div className="schedule schedule--party">
          <h4 className="schedule__pre">WHAT WE'LL DO FOR..</h4>
          <h3 className="schedule__title">PARTY!</h3>

          <h5 className="schedule__quest">WHEN:</h5>
          <p className="schedule__ans">at 21.30</p>
          <br/>

          <h5 className="schedule__quest">WHERE:</h5>
          <p className="schedule__ans">AT MAMA'S, 177 PostdamerPlatz</p>
          <br/>

          <h5 className="schedule__quest">WHO:</h5>
          {
            partyUsers &&
            <SignedUserList users={partyUsers}/>
          }
        </div>


        <div className="schedule schedule--open">
          <h4 className="schedule__pre">PEOPLE THAT STILL NEED TO..</h4>
          <h3 className="schedule__title">CONFIRM!!!</h3>

          {
            openUsers &&
            <OpenUserList
              users={openUsers}
              openModal={this.openModal}
            />
          }
        </div>
      </div>
    )
  }

}
