import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDicMrFpt3WuxZsD-3DNwOq0ltevuFGxDo',
  authDomain: 'lyrics-lab-86dc6.firebaseapp.com',
  projectId: 'lyrics-lab-86dc6',
  storageBucket: 'lyrics-lab-86dc6.appspot.com',
  messagingSenderId: '729814746507',
  appId: '1:729814746507:web:74aa0d5509e9c9e15f5b8e',
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
