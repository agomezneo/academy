import { createContext, useContext, useState, useEffect } from "react";
import nookies from 'nookies';
import {app} from '../../firebaseClient';

const AuthContext = createContext();

const AuthProvider = ({children}) =>{

    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState(null);  
       
    useEffect(() => {
       return app.auth().onIdTokenChanged( async (user)=>{
           if(!user){
               setUser(null);
               nookies.set(undefined, "token", "", {});
               return
           }
           const token = await user.getIdToken();
           setUserID(user.uid)
           const db = app.firestore();
            await db.collection("users").doc(user.uid).get().then(doc =>{
                setUser(doc.data())
            })
           nookies.set(undefined, "token", token, {});
       });
        
    }, []);

    return(
        <AuthContext.Provider value={{user, userID}}>
            {children}
        </AuthContext.Provider>
    )
};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth}