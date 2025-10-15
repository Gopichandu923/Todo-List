// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsdku-P-NPxAPWAAeWaXjgz9llHBSjmpE",
  authDomain: "to-do-list-af672.firebaseapp.com",
  projectId: "to-do-list-af672",
  storageBucket: "to-do-list-af672.firebasestorage.app",
  messagingSenderId: "946092721731",
  appId: "1:946092721731:web:43d6ec4214c28d621b76f6",
  measurementId: "G-83RY93GRFE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
