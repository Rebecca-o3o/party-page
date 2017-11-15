import React, {Component} from 'react'

export default class SignedUserList extends Component {

  render(){
    const {users} = this.props
    return (
      <ul className="signed-user-list">
        {users.map(user => (
          <li key={user.userId}>
            <h6>| {user.name} |</h6>
          </li>
        ))}
      </ul>
    )
  }

}
