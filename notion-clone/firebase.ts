import { initializeApp, getApps,getApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9DznPYObiESF-SyF8rDUwP24Lo9avvBQ",
    authDomain: "notion-clone-577ba.firebaseapp.com",
    projectId: "notion-clone-577ba",
    storageBucket: "notion-clone-577ba.appspot.com",
    messagingSenderId: "186879298958",
    appId: "1:186879298958:web:4922be1a7d9464b0dda8df"
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);

  
  export { db };