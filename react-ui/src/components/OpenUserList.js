import React, {Component} from 'react'

export default class SignedUserList extends Component {

  render(){
    const {users, openModal} = this.props
    return (
      <ul className="open-user-list">
        {users.map(user => (
          <li key={user.userId}>

            <h6>{user.name}</h6>

            <button onClick={e => openModal(user.userId)}>
              <i className="fa fa-hand-spock-o fa-2x" aria-hidden="true"></i>            </button>

          </li>
        ))}
      </ul>
    )
  }

}
