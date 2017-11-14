import React, {Component} from 'react'

export default class SignedUserList extends Component {

  render(){
    const {users} = this.props
    return (
      <ul>
        {users.map(user => (
          <div key={user.userId}>
            <h3>{user.name}</h3>
            <img src={user.image} alt={user.name}/>
          </div>
        ))}
      </ul>
    )
  }

}
