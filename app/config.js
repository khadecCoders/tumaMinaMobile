// Optionally import the services that you want to use
import { initializeApp, getApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
import { getMessaging } from "@react-native-firebase/messaging";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBdeM24jxnOiujDbudFqzCB4eMigMhYNGs",
    authDomain: "tumamina-e39e7.firebaseapp.com",
    projectId: "tumamina-e39e7",
    storageBucket: "tumamina-e39e7.appspot.com",
    messagingSenderId: "174519128936",
    appId: "1:174519128936:web:dafd01409927bb693dbcdd"
  };
  
// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getDatabase(app);
const auth1 = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider(app);
const database = getFirestore(app);
// const messaging = getMessaging(app);

export { auth, db, storage, provider, database, auth1 };