import React, {Component} from 'react'

export default class SignedUserList extends Component {

  render(){
    const {users, openModal} = this.props
    return (
      <ul className="open-user-list">
        {users.map(({userId,name}) => (
          <li key={userId}>

            <h6>{name}</h6>

            <button onClick={e => openModal({userId,name})}>
              <i className="fa fa-hand-spock-o fa-2x" aria-hidden="true"></i>
            </button>

          </li>
        ))}
      </ul>
    )
  }

}
