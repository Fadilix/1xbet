import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginContext from './contexts/LoginContext.jsx'
import { UserNameContext } from './contexts/UsernameContext.jsx'
import { NotificationProvider } from './contexts/NotificationContext.jsx'
import { UserRoleProvider } from './contexts/UserRoleContext.jsx'
import { BubbleStateProvider } from './contexts/InfoBubbleContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginContext>
      <UserNameContext>
        <NotificationProvider>
          <UserRoleProvider>
            <BubbleStateProvider>
              <App />
            </BubbleStateProvider>
          </UserRoleProvider>
        </NotificationProvider>
      </UserNameContext>
    </LoginContext>
  </React.StrictMode>,
)
