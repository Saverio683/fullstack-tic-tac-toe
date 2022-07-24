import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { combineReducers } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import persistReducer from 'redux-persist/es/persistReducer'
import sessionStorage from 'redux-persist/es/storage/session'

import userReducer from './user'

const reducers = combineReducers({
    user: userReducer
})

const persistConfig = {
    key: 'root',
    storage: sessionStorage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const middlewares = [thunk]

if(process.env.NODE_ENV === 'development')
    middlewares.push(logger)  

const store = configureStore({
    reducer: persistedReducer,
    middleware: middlewares,
    devTools: process.env.NODE_ENV !== 'production',
})

export default store
export const persistor = persistStore(store)