import React, { useState, useEffect, useRef } from 'react';
import Backdrop from "components/Backdrop/index";
import styles from '../../styles/AdminNavbar.module.css';
import firebase from "firebase/compat/app";
import {app, db} from '../../firebaseClient';
import SpinerInfinity from 'components/Spiners/Spiner'; 

const Modal = ({handleClose}) =>{

    const filePickerRef = useRef(null)
    const [fileUrl, setFileUrl] = useState(null)
    const [videoToUpdate, setVideoToUpdate] = useState(null)
    const [showSpiner, setShowSpiner] = useState(false)


    const [values, setValues] = useState({ 
            title: "",
            description: "",
            tutor:"VtP4AYQR5TkO6YcPJyBI",
            category: "videos-academia-free",
            tag: "defi",
            tagAP: "clases",
            url: ""
    });

    const onFileChange = async (e) =>{
        const file = e.target.files[0];
        setVideoToUpdate(file);
    }

    const handleChange = e =>{
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setShowSpiner(true)
        const storageRef = app.storage().ref(values.category)
        const fileRef = storageRef.child(videoToUpdate.name)
        const bytes = (await (fileRef.put(videoToUpdate))).bytesTransferred
        console.log(bytes)
        setFileUrl( await fileRef.getDownloadURL() )
    } 

    useEffect(() => {
        if(!fileUrl){
            return
        }
        db.collection(`${values.category}`).add({
            title: values.title,
            description: values.description, 
            tutor: values.tutor,
            category: values.category,
            tag: values.tag,
            tagAP: values.tagAP,
            url: fileUrl,
            created: firebase.firestore.FieldValue.serverTimestamp()
        })
        setShowSpiner(false)
    }, [fileUrl])


    return(
        <Backdrop onClick={handleClose}>
            <div 
                onClick={(e) => e.stopPropagation()}
                className={styles.Modal}
             
            >
                <button onClick={handleClose}>X</button>
                {showSpiner ? 
                    <>
                    <h1>Cargando video al storage, esto tardará unos minutos</h1>
                    <SpinerInfinity/>
                    </>

                    :

                    <div className={styles.contactForm}>
                        <form onSubmit={handleSubmit}>
                            <h2>Subir Video<br/></h2>
                            <div className={styles.inputBox}>
                                <input type='text' name="title" required="required" onChange={handleChange} value={values.title}/>
                                <span>Titulo</span>
                            </div>
                            <div className={styles.inputBox}>
                                <input type='text' name="description" required="required" onChange={handleChange} value={values.description}/>
                                <span>Descripción</span>
                            </div>

                            <div className={styles.inputVideo} onClick={() => filePickerRef.current.click()}>
                                Seleccionar video
                                <input hidden ref={filePickerRef} type='file' required="required" onChange={onFileChange} />
                            </div>

                        

                            <div className={`${styles.inputBox} ${styles.inputSelect}`}>
                                <span style={{position: "relative"}}>Tutor:</span>
                                <select name="tutor" value={values.tutor} onChange={handleChange}>
                                    <option value="VtP4AYQR5TkO6YcPJyBI">Alex Castells</option>
                                    <option value="A36jbKF2GMoWz9vJkhAg">Jorge Montosa</option>
                                    <option  value="Ja74JFqATpJ4WnSruJRQ">Carlos Sotos</option>
                                    <option value="OIpD9hudfdnC2Qihgdsj">Albert Omenat</option>
                                    <option value="KfLjbAXtfChGgeIDjA23">Andrés Fons</option>
                                    <option  value="WB0thbKEv76jjectyIxE">Vicente Gil</option>
                                </select>
                            </div>
                            <div className={`${styles.inputBox} ${styles.inputSelect}`}>
                                <span style={{position: "relative"}}>Categoria:</span>
                                <select name="category" value={values.category} onChange={handleChange}>
                                    <option value="videos-academia-free">Academia Free</option>
                                    <option value="videos-biblioteca">Socio Plus</option>
                                    <option  value="videosAcademiaEnero">Academia Pro</option>
                                </select>
                            </div>
                            {values.category === "videosAcademiaEnero" ?
                                <div className={`${styles.inputBox} ${styles.inputSelect}`}>
                                    <span style={{position: "relative"}}>Etiqueta Pro:</span>
                                    <select name="tagAP" value={values.tagAP} onChange={handleChange}>
                                        <option value="clases">CLASES</option>
                                        <option value="repasos">REPASOS</option>
                                        <option  value="bonos">BONOS</option>
                                    </select>
                                </div>

                                : 

                                null
                            }
                            <div className={`${styles.inputBox} ${styles.inputSelect}`}>
                                <span style={{position: "relative"}}>Etiqueta:</span>
                                <select name="tag" value={values.tag} onChange={handleChange}>
                                    <option value="defi">DEFI</option>
                                    <option value="trading">TRADING</option>
                                    <option  value="crypto">CRYPTO</option>
                                </select>
                            </div>
                            <div className={styles.inputBox}>
                                <input type='submit' value="Enviar"/>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </Backdrop>
    )
};

export default Modal;