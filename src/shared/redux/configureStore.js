import { combineReducers, createStore } from 'redux'
import viewReducer from './view/reducer'

const rootReducer = combineReducers({
    view : viewReducer
})

export default function configureStore(){
    const store = createStore(rootReducer)
    return store
}