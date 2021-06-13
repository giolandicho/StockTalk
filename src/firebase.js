import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCSSr3cJ078q54t4RW2vi9Vj-elsMCgq1E",
    authDomain: "stocktalk-83478.firebaseapp.com",
    projectId: "stocktalk-83478",
    storageBucket: "stocktalk-83478.appspot.com",
    messagingSenderId: "1065234843905",
    appId: "1:1065234843905:web:13a125b314abc5fb1f3300",
    measurementId: "G-6MM4PS4EQS"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;