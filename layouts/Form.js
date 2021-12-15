import React, {useState, useEffect} from 'react';
import styles from '../styles/FormLayout.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaTelegram, FaPhoneAlt } from "react-icons/fa";


function Form({children}) {

    const [screen, setScreen] = useState(false)
    useEffect(() => {
        let document = window.screen.width;
        if(document < 541){
            setScreen(true)
            return
        }
    }, [])

    return (
        <div className={`${styles.bodyForm} overscroll-none`}>
            <div className={styles.Header}>
                <div className={styles.imageContainer}>
                    <Image src='/img/brand/logo.png' width={screen ? "180" : '230'} height={screen ? "30" : '40'} />
                </div>
                <Link href='/admin/dashboard'> 
                <div className={styles.formTitle}>
                    <h1>ACADEMIA</h1>
                </div>
                </Link>
            </div>
            {children}
            <div className={styles.footer}>
                <div>
                    <div className={styles.imageContainer}>
                        <Image src='/img/brand/logo.png' width={screen ? "180" : '230'} height={screen ? "30" : '40'} />
                    </div>
                </div>
                <div className={styles.contactButtons}>
                    <FaTelegram/>
                    <FaWhatsapp/>
                    <FaPhoneAlt/>
                </div>
            </div>
        </div>
    )
}

export default Form
