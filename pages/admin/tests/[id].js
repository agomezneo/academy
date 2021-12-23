import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import {useAuth} from 'context/auth/auth';
import Form from "layouts/Admin";
import styles from '../../../styles/FormLayout.module.css';

function Test({test}) {

    const {currentUser} = useAuth();

    const router = useRouter(); 
    useEffect( async () => {
      if(!currentUser){
        router.push("/auth/login")
      }
    }, [currentUser])

    return (
        <>
        <Form>
            <h1 style={{padding: "1rem 0 1rem 0 ", fontSize: "2rem", color: "#3dae2a"}}>Test del video: {test[0].videoName}</h1>
            <iframe id="googleForm" 
                className={styles.form} 
                src={test[0].url} 
                width="700"     
                height="1000px"
                frameborder="0" 
                marginHeight="0" 
                marginWidth="0">Cargando…
            </iframe>
        </Form>
        
        </>
    )
}

export default Test

export async function getServerSideProps({params}){
    const res = await fetch(`http://localhost:3000/tests`);
    const tests = await res.json();
    const test = tests.filter(test => test.videoId === params.id)

    return {
        props: {
            test
        }
    }
}

