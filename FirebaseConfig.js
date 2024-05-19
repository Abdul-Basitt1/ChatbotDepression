// Import AsyncStorage from the SDK
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXTSZfRPjxdAX_mWU9RzY6um4tV3H_ZI8",
  authDomain: "chatbotdepression-copy.firebaseapp.com",
  projectId: "chatbotdepression-copy",
  storageBucket: "chatbotdepression-copy.appspot.com",
  messagingSenderId: "302923241869",
  appId: "1:302923241869:web:1ab59d7f0f768839cc45c4"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Get a Firestore instance
const db = getFirestore(app);

export { app, auth, db };
