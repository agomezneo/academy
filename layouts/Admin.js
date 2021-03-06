import React, {useState, useEffect, useContext} from "react";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import {useAuth} from 'context/auth/auth';
import {db} from '../firebaseClient';
import styles from '../styles/VideoGallery.module.css'; 
import { Store } from "utils/Store";
 
export default function Admin({ children}) { 

  const {state, dispatch} = useContext(Store);
  const {darkMode} = state;

  const [user, setUser] = useState(null)
  const {currentUser} = useAuth();

  useEffect(() => {
      if(currentUser){
          db.collection("users").doc(currentUser.uid).get().then(doc =>{
              console.log(doc.data())
              setUser(doc.data())
          })
      }
  }, [currentUser])


  return ( 
    <>
      <Sidebar user={user}/> 
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar user={user}/>
        <HeaderStats />
        <div className={`px-4 md:px-10 mx-auto w-full -m-24 ${styles.AdminONE}`}> 
          {children}
        </div>
      </div>
    </>
  );
}
