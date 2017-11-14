import React, {Component} from 'react'

export default class Modal extends Component {

  constructor(props){
    super(props)
    this.state = {
      userId: this.props.userId,
      password: '',
      dinner: false,
      party: false,
      notGoing: false
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
    const {password,dinner,party,notGoing} = this.state
    //check if fields are filled correctly
    if(!password) {
      return this.setState({errorMessage: 'Password is required!'})
    }
    if(!(dinner || party || notGoing)) {
      return this.setState({errorMessage: 'Please select a field!'})
    }
    if((dinner || party) && notGoing) {
      return this.setState({errorMessage: 'Your choice is not correct'})
    }

    //now all fields are filled correctly
    console.log(this.state);
  }

  render(){
    const {errorMessage} = this.state

    return (
      <div className="Modal">

        {errorMessage && <h6 className="error-message">{errorMessage}</h6>}

        <div>
          <h6>Your confirmation code</h6>
          <input type="password" value={this.state.password} onChange={e => this.handleInputField('password', e.target.value)}/>
        </div>

        <div onClick={e => this.handleCheckField('dinner', true)}>
          <h5>Dinner</h5>
          <div className="checkbox"/>
        </div>

        <div onClick={e => this.handleCheckField('party', true)}>
          <h5>Party</h5>
          <div className="checkbox"/>
        </div>

        <div onClick={e => this.handleCheckField('notGoing', true)}>
          <h5>Not Going</h5>
          <div className="checkbox"/>
        </div>

        <button onClick={this.handleSendButton}>Send</button>
      </div>
    )
  }

}
