import authReducer from './authReducer'
import datasetReducer from './datasetReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth : authReducer,
    dataset : datasetReducer,
    firestore : firestoreReducer,
    firebase : firebaseReducer
})

export default rootReducer