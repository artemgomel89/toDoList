import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore'

//Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAD9r6vSSeOAyukX54onp-do1lXpMJnp6U",
    authDomain: "todolist-bd2af.firebaseapp.com",
    projectId: "todolist-bd2af",
    storageBucket: "todolist-bd2af.appspot.com",
    messagingSenderId: "100345287146",
    appId: "1:100345287146:web:a357d43b9a774005236293"
};

const app  = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {db};


