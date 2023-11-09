import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

import { getFunctions } from 'firebase/functions';


const firebaseConfig = {
    apiKey: "AIzaSyCHQx9t5BaZnQ55H06Ir23kMbsJ9wrXLs0",
    authDomain: "artfolio-one.firebaseapp.com",
    projectId: "artfolio-one",
    storageBucket: "artfolio-one.appspot.com",
    messagingSenderId: "849875869706",
    appId: "1:849875869706:web:0ebd24aa9e14d708f6bff3",
    measurementId: "G-B34VX7ES2J"
  };


const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
const db=getFirestore(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const storage= getStorage(app)

const functions= getFunctions(app)



export {db,auth,analytics,provider, storage, functions}