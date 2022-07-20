
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAtkl4x2Vnra0jdtFxQzV0QZcyhcI_B5wc",
  authDomain: "miniblog-b6cdd.firebaseapp.com",
  projectId: "miniblog-b6cdd",
  storageBucket: "miniblog-b6cdd.appspot.com",
  messagingSenderId: "446362863873",
  appId: "1:446362863873:web:0af8a61c669abf42383300"
};

const App = initializeApp(firebaseConfig);

const db = getFirestore(App)

export {db}