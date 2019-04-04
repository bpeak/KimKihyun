import * as actionTypes from './actionTypes'
import { createAction } from 'redux-actions'

export const setView = createAction(actionTypes.SET_VIEW)
export const clearView = createAction(actionTypes.CLEAR_VIEW)