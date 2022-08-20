import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

//Autenticação email e senha login
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAlwYvAp_lczSAytaCXuOVDflAbT5temQ8",
    authDomain: "sistema-14d86.firebaseapp.com",
    projectId: "sistema-14d86",
    storageBucket: "sistema-14d86.appspot.com",
    messagingSenderId: "46508635754",
    appId: "1:46508635754:web:5124c3b169988ee581fc13",
    measurementId: "G-5KD28ZJETC"
  };

  const firebaseApp=initializeApp(firebaseConfig)
  const db=getFirestore(firebaseApp)
  const auth=getAuth(firebaseApp)

  export {auth,db}