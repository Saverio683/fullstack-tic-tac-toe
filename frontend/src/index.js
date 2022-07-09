import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './app/App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { io } from 'socket.io-client'
import { Provider } from 'react-redux'

import store from './redux/store'

export const socket = io('http://localhost:4000')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>     
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();