import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCrHPENT37soUGzJVvtEehpE_sBUjg6JGI",
    authDomain: "labeli-id.firebaseapp.com",
    databaseURL: "https://labeli-id.firebaseio.com",
    projectId: "labeli-id",
    storageBucket: "labeli-id.appspot.com",
    messagingSenderId: "66451595757",
    appId: "1:66451595757:web:9b3be6ceaa3dc542eec7e4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const provider = new firebase.auth.GoogleAuthProvider()

export default firebase;