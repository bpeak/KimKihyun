import * as actionTypes from './actionTypes'
import * as actionCreators from './actionCreators'
import { handleActions } from 'redux-actions'

const initialState = {
    view : null
}

const reducer = handleActions({
    [actionTypes.SET_VIEW] : (state, action) => {
        return ({
            ...state,
            view : action.payload.view
        })
    },
    [actionTypes.CLEAR_VIEW] : (state, action) => {
        return ({
            ...initialState
        })
    }
}, initialState)

export default reducer