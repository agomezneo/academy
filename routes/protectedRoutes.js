/* import React, {useEffect, useContext} from "react";
import {useAuth} from '../context/auth/auth';
import {appRoutes} from '../constantes/index';
import FirebaseContext from '../firebaseContext';

const isBrowser = () => typeof window !== "undefined";

const ProtectedRoutes = ({router, children}) =>{
    const {user} = useAuth();
    const isAuth = user;

    let unProtectedRoutes = [
        appRoutes.LOGIN_PAGE,
    ]

    let pathProtected = unProtectedRoutes.indexOf(router.pathname) === -1;

    if(isBrowser() && !isAuth && pathProtected){
        router.push(appRoutes.LOGIN_PAGE);
    }else if(isBrowser() && isAuth && router.pathname === appRoutes.LOGIN_PAGE){
        router.back();

        return children;
    }


}

export default ProtectedRoutes; */
