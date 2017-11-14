import React, {Component} from 'react'

export default class SignedUserList extends Component {

  render(){
    const {users, openModal} = this.props
    return (
      <ul>
        {users.map(user => (
          <div key={user.id}>

            <h3>{user.name}</h3>
            <img src={user.imageUrl} alt={user.name}/>

            <button onClick={e => openModal(user.id)}>
              Confirm
            </button>

          </div>
        ))}
      </ul>
    )
  }

}
