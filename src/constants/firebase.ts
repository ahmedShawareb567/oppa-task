import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from '@firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyCN-LRVH2tvYimkMVj02f5E8uskTTQ9lVM",
  authDomain: "oppa-a465b.firebaseapp.com",
  projectId: "oppa-a465b",
  storageBucket: "oppa-a465b.appspot.com",
  messagingSenderId: "602839706203",
  appId: "1:602839706203:web:02c04a9533fcd3f37a6d7e",
  measurementId: "G-VKY4VXGJDF"
};

const $firebase = initializeApp(firebaseConfig);
const $analytics = getAnalytics($firebase);
const $auth = getAuth($firebase);
const $db = getFirestore($firebase);

export {$firebase, $analytics, $auth, $db}