import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBs8F_F6fIJek9mC4K1zS2d8gXwc2qHZUQ",
    authDomain: "truecup-d769d.firebaseapp.com",
    databaseURL: "https://truecup-d769d.firebaseio.com",
    projectId: "truecup-d769d",
    storageBucket: "",
    messagingSenderId: "783400468229",
    appId: "1:783400468229:web:cdfab87424180f00"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
