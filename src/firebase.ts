import firebase from 'firebase/compat/app';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; 
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAN9tIA8nns9JBpEVfFQAK2EUQbbyDF0cg",
  authDomain: "telegram-clone-34483.firebaseapp.com",
  projectId: "telegram-clone-34483",
  storageBucket: "telegram-clone-34483.appspot.com",
  messagingSenderId: "581049175240",
  appId: "1:581049175240:web:18d55374a17fa2894d69fd"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider};
export default db;

// Add data

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// Read data

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });