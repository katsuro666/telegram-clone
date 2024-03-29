import firebase from 'firebase/compat/app';
import { getDatabase } from "firebase/database";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAN9tIA8nns9JBpEVfFQAK2EUQbbyDF0cg",
  authDomain: "telegram-clone-34483.firebaseapp.com",
  projectId: "telegram-clone-34483",
  storageBucket: "telegram-clone-34483.appspot.com",
  messagingSenderId: "581049175240",
  appId: "1:581049175240:web:18d55374a17fa2894d69fd"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const realtimeDb = getDatabase(firebaseApp, 'https://telegram-clone-34483-default-rtdb.europe-west1.firebasedatabase.app/');
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db, realtimeDb };
