import { createContext, useContext, useState, useEffect } from "react";
import nookies from 'nookies';
import {auth, db} from '../../firebaseClient';

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){ 

    const [currentUser, setCurrentUser] = useState(null);
    /* const [userInfo, setUserInfo] = useState(null); */
    const [loading, setLoading] = useState(true)

    function singUp(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)/* .then((user)=>{
            if(user){
                console.log("LOGIN_USER::", user.user.uid)
                db.collection("users").doc(user.user.uid).get().then(doc =>{
                    console.log(doc.data())
                    setUserInfo(doc.data())
                })
            }
        }) */
    }

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe;
    }, [])


    const value = {
        currentUser, 
        /* userInfo, */
        singUp,
        login
    }
    /* const [userID, setUserID] = useState(null);  
       
    useEffect(() => {
       return app.auth().onIdTokenChanged( async (user)=>{
           if(!user){
               setUser(null);
               nookies.set(undefined, "token", "", {});
               return
           }

           console.log(user)

           const token = await user.getIdToken();

           setUserID(user.uid)

           console.log(user.uid)
           const db = app.firestore();
            await db.collection("users").doc(user.uid).get().then(doc =>{
                setUser(doc.data())
            })
           nookies.set(undefined, "token", token, {});
       });
        
    }, []);

    console.log('Este es el USER:::', user)
 */
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
};

/* const useAuth = () => useContext(AuthContext); */

/* export {AuthProvider, useAuth} */