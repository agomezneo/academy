import React, {useState, useEffect} from "react";
import Login from "./auth/login";
import Auth from "layouts/Auth.js";
import {useAuth} from "../context/auth/auth";
import Index from '../pages/admin/index';

export default function Dashboard() { 
  const {user} = useAuth();
  return (
    <>
      {!user ?

        <Login />

        :

        <Index />

        
      }
    </> 
  );
}


