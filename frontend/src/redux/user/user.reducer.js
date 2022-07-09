import {
    FETCH_USER_DATA_SUCCESS,
    FETCH_USER_DATA_REQUEST,
    FETCH_USER_DATA_FAILURE,
    VICTORY,
    DEFEAT,
    DRAW
} from './user.types'

const INITIAL_STATE = {
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

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
                gamesPlayed: action.payload.gamesPlayed,
                gamesWon: action.payload.gamesWon,
                gamesLost: action.payload.gamesLost,
                draws: action.payload.draws,
                loading: false
            }
        case FETCH_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_DATA_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case VICTORY:
            return {
                ...state,
                gamesPlayed: state.gamesPlayed++,
                gamesWon: state.gamesWon++
            }
        case DEFEAT: 
            return {
                ...state,
                gamesPlayed: state.gamesPlayed++,
                gamesLost: state.gamesLost++
            }
        case DRAW:
            return {
                ...state,
                gamesPlayed: state.gamesPlayed++,
                draws: state.draws++
            }
        default:
            return state
    }
}

export default userReducer