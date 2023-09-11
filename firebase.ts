import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAc8TX0DrxBKwVYPecwwzsSWmxGg_eZLko',
  authDomain: 'chatgpt-msg-clone.firebaseapp.com',
  projectId: 'chatgpt-msg-clone',
  storageBucket: 'chatgpt-msg-clone.appspot.com',
  messagingSenderId: '710963068787',
  appId: '1:710963068787:web:6f31334d86ff0d0c89cf06',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
