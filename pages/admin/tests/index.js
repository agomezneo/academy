/* import React, {useState ,useEffect} from 'react';
import Form from '../../../layouts/Form';
import styles from '../../../styles/FormLayout.module.css';
import {useRouter} from 'next/router';

export default function Test({documents}) {

    const router = useRouter();

    return (
        <>
            <Form>
                <iframe id="googleForm" className={styles.form} src="https://docs.google.com/forms/d/e/1FAIpQLScSRkEDavrHVyDbMX3RFGdF1tfWlR-ljtM7fl9McaKEgGTb7A/viewform?embedded=true" width="700" height="1000px" frameborder="0" marginHeight="0" marginWidth="0">Cargando…</iframe>
            </Form>

            {documents.map((doc, key)=>{
                return(
                    <ul key={key}>
                        <li>
                            <span> <strong>URL</strong> {doc.url}</span>
                            <span> <strong>NAME</strong> {doc.name}</span>
                        </li>
                    </ul>
                )
            })
            
            }
        </>
    )
}

export async function getServerSideProps(){
    const res = await fetch('http://localhost:3000/documents');
    const documents = await res.json();

    return {
        props: {
            documents
        }
    }
}
 */

