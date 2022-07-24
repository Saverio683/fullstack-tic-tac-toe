import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './app/App'
import reportWebVitals from './reportWebVitals'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { io } from 'socket.io-client'
import { Provider } from 'react-redux'

import store, { persistor } from './redux/store'

export const socket = io('http://localhost:4000')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>     
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();