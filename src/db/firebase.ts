import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  type User,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  get,
  child,
  onValue,
  set,
  update,
  remove,
  query,
  orderByChild,
  equalTo,
  type DataSnapshot,
  type DatabaseReference,
  push,
} from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  db,
  googleProvider,
  firebaseSignInWithEmailAndPassword,
  firebaseCreateUserWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  ref,
  get,
  child,
  onValue,
  set,
  update,
  remove,
  query,
  orderByChild,
  equalTo,
  type DataSnapshot,
  type DatabaseReference,
  type User,
  push,
  storage,
  storageRef,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
};
