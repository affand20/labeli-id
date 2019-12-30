import authReducer from './authReducer'
import datasetReducer from './datasetReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    auth : authReducer,
    dataset : datasetReducer,
    firestore : firestoreReducer
})

export default rootReducer