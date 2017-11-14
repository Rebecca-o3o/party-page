import React, {Component} from 'react'

export default class SignedUserList extends Component {

  render(){
    const {users, openModal} = this.props
    return (
      <ul>
        {users.map(user => (
          <div key={user.userId}>

            <h3>{user.name}</h3>
            <img src={user.imageUrl} alt={user.name}/>

            <button onClick={e => openModal(user.userId)}>
              Confirm
            </button>

          </div>
        ))}
      </ul>
    )
  }

}
