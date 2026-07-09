// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2oPTrdqG6HWVLIPoh_HOmXHb98sHEQKg",
  authDomain: "mahdi-summer-chat.firebaseapp.com",
  projectId: "mahdi-summer-chat",
  storageBucket: "mahdi-summer-chat.firebasestorage.app",
  messagingSenderId: "189185718526",
  appId: "1:189185718526:web:497085957853202ebb4daf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
