import React, {useState ,useEffect} from 'react';
import Form from '../../../layouts/Form';
import styles from '../../../styles/FormLayout.module.css';
import {useRouter} from 'next/router';
import DataTests from './DataTests';

function Test() {
    const router = useRouter();

    console.log(router.query.path)
    return (
            <>
                <Form>
                    <iframe id="googleForm" className={styles.form} src="https://docs.google.com/forms/d/e/1FAIpQLScSRkEDavrHVyDbMX3RFGdF1tfWlR-ljtM7fl9McaKEgGTb7A/viewform?embedded=true" width="700" height="1000px" frameborder="0" marginHeight="0" marginWidth="0">Cargando…</iframe>
                </Form>
            </>
    )
}

/* export function getServerStaticProps */

/* export async function getStaticsPaths(){
    const DataTests = [
        {
           params:{ 
            path: "testv1",
            src: "https://docs.google.com/forms/d/e/1FAIpQLScSRkEDavrHVyDbMX3RFGdF1tfWlR-ljtM7fl9McaKEgGTb7A/viewform?embedded=true"
            }
        },
        {
           params:{
            path: "testv2",
            src: "https://docs.google.com/forms/d/e/1FAIpQLSdSEmWrNJ_zNP6omqBu7NzTS4DiIdCbABhJPVOamX1etoZ5GQ/viewform?usp=sf_link"
           }
        },
        {
           params:{
            path: "testv3",
            src: "https://docs.google.com/forms/d/e/1FAIpQLSfb8YV_BHt3sStc3mD7gYvnRs5PGnhXvuu_iv1Yq9udCLOvEg/viewform?usp=sf_link"
           }
        },
    ]
} */ 

export default Test
