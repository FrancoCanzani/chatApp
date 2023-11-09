// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCC8dhxwj9XMT-4fRTrIpoduut8nFfpnrw',
  authDomain: 'chat-ecfdb.firebaseapp.com',
  projectId: 'chat-ecfdb',
  storageBucket: 'chat-ecfdb.appspot.com',
  messagingSenderId: '956898052778',
  appId: '1:956898052778:web:9908b5707486021e09ded3',
  measurementId: 'G-23GG95EG97',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
