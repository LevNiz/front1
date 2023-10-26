import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCGwQN1ABTd1RklMjJ6wgE3sGi0nzy4eUc',
  authDomain: 'givboxru.firebaseapp.com',
  projectId: 'givboxru',
  storageBucket: 'givboxru.appspot.com',
  messagingSenderId: '623859562955',
  appId: '1:623859562955:web:e7929f9dd96393ef969e4e',
  measurementId: 'G-MY92SW41RE',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
