import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    username: null,
    email: null,
    password: null,
    gamesPlayed: null,
    gamesWon: null,
    gamesLost: null,
    draws: null
 }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        victory (state) {
            state.gamesPlayed++
            state.gamesWon++
        },
        defeat (state) {
            state.gamesPlayed++
            state.gamesLost++
        },
        draw (state) {
            state.gamesPlayed++
            state.draws++
        },
        setUserData (state, { payload }) {
            state.username = payload.username
            state.email = payload.email
            state.password = payload.password
        }   
    }
})

export const { setUserData } = userSlice.actions
export default userSlice.reducer