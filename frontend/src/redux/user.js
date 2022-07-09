import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = { 
    username: null,
    email: null,
    password: null,
    gamesPlayed: null,
    gamesWon: null,
    gamesLost: null,
    draws: null,
    loading: false,
    error: null    
 }

 const serializeAndStringify = obj => {
    const seen = []
    JSON.stringify(
        obj,
        (key, val) => {
            if(val != null && typeof val === 'object') {
                if(seen.indexOf(val) >= 0)
                   return
                seen.push(val)
            }
            return val                
        }
    )
    return seen[0]
}

export const fetchUserData = (requestUrl, userData) => 
    createAsyncThunk(
        requestUrl,
        async (payload, { dispatch }) => {
            console.log('aaaaa', requestUrl)
            return axios.post(requestUrl, serializeAndStringify(userData))
        }
    )

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
        }         
    },
    extraReducers: {
        [fetchUserData.pending]: (state, action) => {
            state.loading = true
        },
        [fetchUserData.fullFilled]: (state, { payload }) => {
            state.loading = false
            state.username = payload.username
            state.email = payload.email
            state.password = payload.password             
        },
        [fetchUserData.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { victory } = userSlice.actions
export default userSlice.reducer