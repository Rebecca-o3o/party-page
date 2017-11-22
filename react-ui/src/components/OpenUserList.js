import React, {Component} from 'react'

export default class SignedUserList extends Component {

  render(){
    const {users, openModal} = this.props
    return (
      <ul className="open-user-list">
        {users.map(({userId,name}) => (
          <li
            key={userId}
            onClick={e => openModal({userId,name})}
          >

            <h6>{name}</h6>

            <i className="fa fa-hand-spock-o" aria-hidden="true"></i>

          </li>
        ))}
      </ul>
    )
  }

}
