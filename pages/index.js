import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import  Dashboard from "../pages/admin/dashboard";
import {useAuth} from 'context/auth/auth';


export default function Index() { 

  const {currentUser} = useAuth();
  

  const router = useRouter(); 

  /* console.log(currentUser.uid); */

  useEffect( async () => {
    if(!currentUser){
      router.push("/auth/login")
    }
  }, [currentUser])

  
  return (
    <>
      {currentUser && <Dashboard/>}
    </>
  );
}


