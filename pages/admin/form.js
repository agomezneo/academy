import React, {useState ,useEffect} from 'react';
import Form from '../../layouts/Form';
import styles from '../../styles/FormLayout.module.css';
import {useAuth} from 'context/auth/auth';



function Formm() {

    const user = useAuth();
    const userID = user.userID;

    useEffect(() => {
        const doc = document;
        const form = doc.getElementById('googleForm');

        console.log(form)
    }, [document])
   
    return (
        <Form>
            <iframe id="googleForm" className={styles.form} src="https://docs.google.com/forms/d/e/1FAIpQLScSRkEDavrHVyDbMX3RFGdF1tfWlR-ljtM7fl9McaKEgGTb7A/viewform?embedded=true" width="700" height="1000px" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
        </Form>
    )
}

export default Formm
