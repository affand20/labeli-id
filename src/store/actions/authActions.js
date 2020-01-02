export const signInWithEmail = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({ type: 'LOGIN_PROGRESS' })
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err })
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}

export const register = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({ type: 'SIGNUP_PROGRESS' })
        const firebase = getFirebase()
        const firestore = getFirestore()    
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((res) => {
            return firestore.collection('users').doc(res.user.uid).set({
                nama: newUser.nama,
                inisial: newUser.nama[0]
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}