import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCxYSz91Vhc9qkHcaNbqjnCVYmo5VzNIfE",
    authDomain: "mastering-firebase613.firebaseapp.com",
    projectId: "mastering-firebase613",
    storageBucket: "mastering-firebase613.appspot.com",
    messagingSenderId: "400464571093",
    appId: "1:400464571093:web:f450f8dbd9b7530c2f905c",
    measurementId: "G-PWPCZT3507"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };