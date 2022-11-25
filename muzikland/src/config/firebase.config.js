import { getApp, getApps, initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

const firebaseConfig = {
    apiKey: "AIzaSyBGJ4xQHIlM3s5RKbHqpZZ0HdEl97XJeW8",
    authDomain: "muzikland-project-music-web.firebaseapp.com",
    projectId: "muzikland-project-music-web",
    storageBucket: "muzikland-project-music-web.appspot.com",
    messagingSenderId: "221738418148",
    appId: "1:221738418148:web:640f75290229fe258651f1"
  };

// console.log(process.env.REACT_APP_FIREBASE_API_KEY);

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app, storage};