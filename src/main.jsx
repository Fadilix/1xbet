import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginContext from './contexts/LoginContext.jsx'
import { UserNameContext } from './contexts/UsernameContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginContext>
      <UserNameContext>
        <App />
      </UserNameContext>
    </LoginContext>
  </React.StrictMode>,
)
