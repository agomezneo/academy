import React, {useState ,useEffect} from 'react';
import Form from '../../layouts/Form';
import styles from '../../styles/FormLayout.module.css';
import {useAuth} from 'context/auth/auth';
import { useRouter } from "next/router";


function Formm() {

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
            <Form>
                <iframe id="googleForm" className={styles.form} src="https://docs.google.com/forms/d/e/1FAIpQLScSRkEDavrHVyDbMX3RFGdF1tfWlR-ljtM7fl9McaKEgGTb7A/viewform?embedded=true" width="700" height="1000px" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
            </Form>
        }
        </>
    )
}

export default Formm
