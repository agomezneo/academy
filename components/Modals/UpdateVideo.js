import React, { useState, useEffect, useRef } from 'react';
import Backdrop from "components/Backdrop/index";
import styles from '../../styles/AdminNavbar.module.css';
import firebase from "firebase/compat/app";
import {app} from '../../firebaseClient';

const Modal = ({handleClose}) =>{

    const filePickerRef = useRef(null)
    const [videoToUpdate, setVideoToUpdate] = useState(null)

    const [values, setValues] = useState({ 
            title: "",
            description: "",
            tutor:"VtP4AYQR5TkO6YcPJyBI",
            category: "videos-academia-free",
            tag: "defi"
    });

    const handleChange = e =>{
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        });
        console.log(values)
    };

    const db = app.firestore();
    const storage = app.storage();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        db.collection(`${values.category}`).add({
            title: values.title,
            description: values.description, 
            tutor: values.tutor,
            category: values.category,
            tag: values.tag,
            created: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((doc) =>{
            if(videoToUpdate){
                const uploadTask = storage
                .ref(`videos/${values.category}/${doc.id}`)
                .putString(videoToUpdate, "data_url");

                removeVideo();

                uploadTask.on(
                    "state_change", 
                    null, 
                    (error) => console.error(error), 
                    ()=>{
                        storage.ref(`videos/${values.category}`).child(doc.id).getDownloadURL().then(url =>{
                            db.collection(`${values.category}`).doc(doc.id).set({
                                url: url
                            }, {merge: true})
                        })
                    }
                )
            }
        })
    }

    const addVideo = (e) =>{
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) =>{
            setVideoToUpdate(readerEvent.target.result)
        }
    }
    const removeVideo = () =>{
        setVideoToUpdate(null)
    }

    return(
        <Backdrop onClick={handleClose}>
            <div 
                onClick={(e) => e.stopPropagation()}
                className={styles.Modal}
              
            >
                <button onClick={handleClose}>X</button>

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
                            <input hidden ref={filePickerRef} type='file' required="required" onChange={addVideo} />
                        </div>
                        {videoToUpdate && (
                            <div onClick={removeVideo} className="flex flex-col filter hover:brightness-110 transition duration-150 hover:scale-105 cursor-pointer">
                                <video className="h-10 object-contain" src={videoToUpdate} alt="videoToUpdate"/>
                                <p className="text-xs text-red-500 text-center cursor-pointer">Quitar video</p>
                            </div>
                        ) }
                        <div className={`${styles.inputBox} ${styles.inputSelect}`}>
                            <span>Tutor:</span>
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
                            <span>Categoria:</span>
                            <select name="category" value={values.category} onChange={handleChange}>
                                <option value="videos-academia-free">Academia Free</option>
                                <option value="videos-biblioteca">Socio Plus</option>
                                <option  value="videosAcademiaEnero">Academia Pro</option>
                            </select>
                        </div>
                        <div className={`${styles.inputBox} ${styles.inputSelect}`}>
                            <span>Etiqueta:</span>
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
            </div>
        </Backdrop>
    )
};

export default Modal;