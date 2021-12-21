import React, {useState ,useEffect} from 'react';
import styles from '../../../styles/Documents.module.css';
import {BsFileEarmarkPdfFill } from "react-icons/bs";
import Admin from "layouts/Admin.js";
import {useRouter} from 'next/router';

export default function Test({documents}) {

    const router = useRouter();

    return (
        
        <div className={styles.DocsContainer}>
            {documents.map((doc, key)=>{
                return(
                    <ul key={key}>
                        <li>
                            <a href={doc.documentUrl} target= "_blank" style={{display: "block", alignItems: "flex-end"}}>
                                <BsFileEarmarkPdfFill style={{color: "red", fontSize: "5rem"}}/>
                                <span style={{fontSize: "1rem", color: "#3dae2a"}}>{doc.name}</span>
                            </a>
                        </li>
                    </ul>
                )
            })
            }
        </div>
    
    )
}

Test.layout = Admin;

export async function getServerSideProps(){
    const res = await fetch('http://localhost:3000/documents');
    const documents = await res.json();

    return {
        props: {
            documents
        }
    }
}


