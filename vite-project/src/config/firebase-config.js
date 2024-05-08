// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { setPersistence, browserLocalPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA392UEm9lzv8ZwYdvYfG71xEi_Zz1WZj0",
  authDomain: "vmd-reactrealm-forum.firebaseapp.com",
  projectId: "vmd-reactrealm-forum",
  storageBucket: "vmd-reactrealm-forum.appspot.com",
  messagingSenderId: "25434076304",
  appId: "1:25434076304:web:d52d6218c7faf7c3e1d415",
  databaseURL:
    "https://vmd-reactrealm-forum-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence);