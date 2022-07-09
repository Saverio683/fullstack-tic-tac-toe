import axios from 'axios'

import {
    FETCH_USER_DATA_SUCCESS,
    FETCH_USER_DATA_REQUEST,
    FETCH_USER_DATA_FAILURE,
    VICTORY,
    DEFEAT,
    DRAW
} from './user.types'

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

export const fetchUserDataSuccess = data => ({
    type: FETCH_USER_DATA_SUCCESS,
    payload: data
})

export const fetchUserDataRequest = () => ({
    type: FETCH_USER_DATA_REQUEST
})

export const fetchUserDataFailure = error => ({
    type: FETCH_USER_DATA_FAILURE,
    payload: error
})

export const fetchData = (requestUrl, userData) => {
    return dispatch => {
        dispatch(fetchUserDataRequest())
        axios.post(requestUrl, serializeAndStringify(userData))      
            .then(resp => dispatch(fetchUserDataSuccess(resp)))
            .catch(err => {
                dispatch(fetchUserDataFailure(err))
                /* alert(
                        err.response.data.error 
                    || 
                        'Ops... something went wrong' //if the error don't depend on the fact that the username
                        //or email has already been taken, a generic error message is sent
                )
                console.error(err.response.data) */
            }) 
    }
}

export const playerVictory = () => ({
    type: VICTORY
})

export const playerDefeat = () => ({
    type: DEFEAT
})

export const playerDraw = () => ({
    type: DRAW
})

export const fetchGameData = (outcome, username) => {
    axios.post('/game', { outcome, username })
        .then(() => console.log('ok'))
        .catch(err => console.error(err))
}