import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD-mOSmHgcMTl3E1H_coo_M1yqRCwssuEg",
    authDomain: "todoappbyk.firebaseapp.com",
    projectId: "todoappbyk",
    storageBucket: "todoappbyk.appspot.com",
    messagingSenderId: "249301294106",
    appId: "1:249301294106:web:650321d1b9926891f885a3"
};

export default firebaseApp = firebase.initializeApp(firebaseConfig)