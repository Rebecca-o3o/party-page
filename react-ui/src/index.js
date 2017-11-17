import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './inner.css'
import './outer.css'
import './modal.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
registerServiceWorker()
