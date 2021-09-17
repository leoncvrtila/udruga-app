import firebase from 'firebase/app'
import 'firebase/storage'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDypCwujR02xOsuxL-PQj75CSsrio6Iykc",
    authDomain: "udruga-desk.firebaseapp.com",
    databaseURL: "https://udruga-desk.firebaseio.com",
    projectId: "udruga-desk",
    storageBucket: "udruga-desk.appspot.com",
    messagingSenderId: "853136878276",
    appId: "1:853136878276:web:8d99bd499788978dd43791"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }