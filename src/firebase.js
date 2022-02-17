import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'gender-reveal-bfa8d.firebaseapp.com',
  projectId: 'gender-reveal-bfa8d',
  storageBucket: 'gender-reveal-bfa8d.appspot.com',
  messagingSenderId: '523194344471',
  appId: '1:523194344471:web:8e0c90443574474ce62852',
})

export const db = getFirestore()
