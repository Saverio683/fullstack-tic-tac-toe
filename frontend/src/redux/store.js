import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import userReducer from './user'

const reducer = {
    user: userReducer
  }

const middlewares = [thunk]

if(process.env.NODE_ENV === 'development')
    middlewares.push(logger)  

const store = configureStore({
    reducer,
    middleware: middlewares,
    devTools: process.env.NODE_ENV !== 'production',
})

export default store