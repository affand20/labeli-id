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
            console.log('login failed')
            state.isLoading = false
            return {
                ...state,
                authError: action.err.message
            }
        case 'LOGIN_SUCCESS':
            console.log('login success')
            state.isLoading = false
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout sucess')
            return state
        case 'SIGNUP_PROGRESS':
            state.isLoading = true
            return state
        case 'SIGNUP_SUCCESS':
            console.log('signup success')
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error', action.err.message)
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state
    }    
}

export default authReducer