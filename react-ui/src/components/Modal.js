import React, {Component} from 'react'

export default class Modal extends Component {

  constructor(props){
    super(props)
    this.state = {
      userId: this.props.userId,
      confirmationCode: '',
      dinner: false,
      party: false,
      declined: false
    }
    //bind methods
    this.handleInputField = this.handleInputField.bind(this)
    this.handleCheckField = this.handleCheckField.bind(this)
    this.handleSendButton = this.handleSendButton.bind(this)
  }

  handleInputField(key,value){
    this.setState({
      [key]: value
    })
  }

  handleCheckField(key,value){
    this.setState({
      [key]: !this.state[key]
    })
  }

  handleSendButton(){
    const {confirmationCode,dinner,party,declined} = this.state
    const {closeModalAndUpdateUser} = this.props
    //check if fields are filled correctly
    if(!confirmationCode) {
      return this.setState({errorMessage: 'Confirmation Code is required!'})
    }
    if(!(dinner || party || declined)) {
      return this.setState({errorMessage: 'Please select a field!'})
    }
    if((dinner || party) && declined) {
      return this.setState({errorMessage: 'Your choice is not correct'})
    }

    //now all fields are filled correctly --> pass updated user back to 'Invitation' and close the 'Modal'
    closeModalAndUpdateUser(this.state)
  }

  render(){
    const {errorMessage} = this.state

    return (
      <div className="Modal">

        {errorMessage && <h6 className="error-message">{errorMessage}</h6>}

        <div>
          <h6>Your confirmation code</h6>
          <input type="text" value={this.state.confirmationCode} onChange={e => this.handleInputField('confirmationCode', e.target.value)}/>
        </div>

        <div onClick={e => this.handleCheckField('dinner', true)}>
          <h5>Dinner</h5>
          <div className="checkbox"/>
        </div>

        <div onClick={e => this.handleCheckField('party', true)}>
          <h5>Party</h5>
          <div className="checkbox"/>
        </div>

        <div onClick={e => this.handleCheckField('declined', true)}>
          <h5>Not Going</h5>
          <div className="checkbox"/>
        </div>

        <button onClick={this.handleSendButton}>Send</button>
      </div>
    )
  }

}
