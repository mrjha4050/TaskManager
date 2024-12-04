//firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQkANKuaYSm0dbybHLMuisFggANn_O0pg",
  authDomain: "taskmanager-fb0e6.firebaseapp.com",
  projectId: "taskmanager-fb0e6",
  storageBucket: "taskmanager-fb0e6.firebasestorage.app",
  messagingSenderId: "516860624795",
  appId: "1:516860624795:web:351e650de3714e36c52b3e",
  measurementId: "G-KJ192MDSDN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};
