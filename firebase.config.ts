// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkjIdf3NZDWmcPAZHSPv8WJ--bYkgDssA",
  authDomain: "celestialdoc.firebaseapp.com",
  projectId: "celestialdoc",
  storageBucket: "celestialdoc.appspot.com",
  messagingSenderId: "771653753639",
  appId: "1:771653753639:web:23c68db2db634a519be702",
  measurementId: "G-GKXDQPQRDN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);