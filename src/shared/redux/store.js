import { combineReducers, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import viewReducer from './view/reducer'

const rootReducer = combineReducers({
    view : viewReducer
})

const store = createStore(
    rootReducer,
    // applyMiddleware(logger)
)

export default store