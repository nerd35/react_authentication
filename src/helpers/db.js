import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyBXtC9CnlDM5h0Mburj5Hj2MVD5HbxHrYs",
    authDomain: "authentication-5f3a4.firebaseapp.com",
    projectId: "authentication-5f3a4",
    storageBucket: "authentication-5f3a4.appspot.com",
    messagingSenderId: "941329747829",
    appId: "1:941329747829:web:c5db19331b51fe42264d3c"
  };
  // Initialize Firebase
  const firebaseAuth = firebase.initializeApp(firebaseConfig);

  export default firebaseAuth;