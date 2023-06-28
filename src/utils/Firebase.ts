// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBhwjvdnt8FxyHazIQ7YTribTJWcNVP6Yw',
  authDomain: 'yma-sneaker.firebaseapp.com',
  projectId: 'yma-sneaker',
  storageBucket: 'yma-sneaker.appspot.com',
  messagingSenderId: '650354239259',
  appId: '1:650354239259:web:0d0191fcd2c4b8447415be',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init service
export const auth = getAuth();
