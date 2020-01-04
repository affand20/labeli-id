const initialState = {
    authError: null,
    isLoading: null
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOGIN_PROGRESS':
            state.isLoading = true
            return state
        case 'LOGIN_ERROR':            
            state.isLoading = false
            return {
                ...state,
                authError: action.err.message
            }
        case 'LOGIN_SUCCESS':            
            state.isLoading = false
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':            
            return state
        case 'SIGNUP_PROGRESS':
            state.isLoading = true
            return state
        case 'SIGNUP_SUCCESS':            
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':            
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state
    }    
}

export default authReducer