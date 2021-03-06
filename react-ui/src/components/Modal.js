import React, {Component} from 'react'

export default class Modal extends Component {

  constructor(props){
    super(props)
    this.state = {
      userId: this.props.user.userId,
      name: this.props.user.name,
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

  handleCheckField(key){
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
    const {closeModal} = this.props
    const {errorMessage} = this.state

    return (
      <div className="modal-overlay">
        <div className="modal">


          <h2 className="close-modal" onClick={closeModal}>X</h2>

          <h2>Hi {this.state.name}</h2>

          <h2>Please insert your confirmation code and click on applicable checkboxes</h2>
          {errorMessage && <h2 className="error-message">{errorMessage}</h2>}
          <input type="text" value={this.state.confirmationCode} onChange={e => this.handleInputField('confirmationCode', e.target.value)}/>

          <div className="checkbox-container">
            <div onClick={e => this.handleCheckField('dinner')}>
              <div className={this.state.dinner ? 'checkbox checked': 'checkbox'}>
                <h2>Sure, I join for dinner</h2>
              </div>
            </div>

            <div onClick={e => this.handleCheckField('party')}>
              <div className={this.state.party ? 'checkbox checked': 'checkbox'}>
                <h2>Let's party!</h2>
              </div>
            </div>

            <div onClick={e => this.handleCheckField('declined')}>
              <div className={this.state.declined ? 'checkbox checked': 'checkbox'}>
                <h2>Too bad, I can't come</h2>
              </div>
            </div>
          </div>

          <button onClick={this.handleSendButton}>Send</button>
        </div>
      </div>
    )
  }

}
