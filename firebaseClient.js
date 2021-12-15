import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"

export const app = firebase.initializeApp({
    apiKey: "AIzaSyD-Qxjyrp21q9SYUMb_pe6iMVb67l2FGgs",
    authDomain: "proyectoneo-ffc21.firebaseapp.com",
    databaseURL: "https://proyectoneo-ffc21-default-rtdb.firebaseio.com",
    projectId: "proyectoneo-ffc21",
    storageBucket: "proyectoneo-ffc21.appspot.com",
    messagingSenderId: "288232406592",
    appId: "1:288232406592:web:2e459ddbc490f15b3b69a5",
    measurementId: "G-NEKLFCY0HQ"
})

const db = app.firestore();
const auth = app.auth(); 

export {auth, db}
export default app;