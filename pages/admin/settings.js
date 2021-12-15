import React, {useState, useEffect} from "react";
import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js"; 
import Admin from "layouts/Admin.js";
import {useAuth} from 'context/auth/auth';
import {db} from '../../firebaseClient';
import { useRouter } from "next/router";

export default function Settings() { 

    const {currentUser} = useAuth();

    const router = useRouter(); 
    useEffect( async () => {
      if(!currentUser){
        router.push("/auth/login")
      }
    }, [currentUser])

  return (
    <>
     {currentUser && 
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings currentUser={currentUser}/>
        </div>
        <div className="w-full lg:w-4/12 px-4"> 
          <CardProfile currentUser={currentUser}/>
        </div>
      </div>
     }
    </>
  );
}

Settings.layout = Admin;
