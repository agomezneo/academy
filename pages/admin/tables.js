import React, {useState, useEffect} from "react";
import Admin from "layouts/Admin.js";
import UsersTable from "../../components/Cards/UsersTable";
import {useAuth} from 'context/auth/auth';
import { useRouter } from "next/router";

export default function Tables() { 
  const {currentUser} = useAuth();
  const router = useRouter(); 
  useEffect( async () => {
    if(!currentUser){
      router.push("/auth/login")
    }
  }, [currentUser])
  return (
    <>
     {currentUser &&  <UsersTable/>}
    </>
  );
}

Tables.layout = Admin;
