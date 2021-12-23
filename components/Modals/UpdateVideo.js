import React, { useState, useEffect, useRef } from 'react';
import Backdrop from "components/Backdrop/index";
import styles from '../../styles/AdminNavbar.module.css';
import firebase from "firebase/compat/app";
import {app, db} from '../../firebaseClient';
import { AiFillCloseCircle } from "react-icons/ai";
import SpinerInfinity from 'components/Spiners/Spiner'; 

const Modal = ({handleClose}) =>{

    const videoPickerRef = useRef(null)
    const documentPickerRef = useRef(null)
    const [videoUrl, setVideoUrl] = useState(null)
    const [documentId, setDocumentId] = useState(null)
    const [videoToUpdate, setVideoToUpdate] = useState(null)
    const [documentToUpdate, setDocumentToUpdate] = useState(null)
    const [showSpiner, setShowSpiner] = useState(false)

    const [values, setValues] = useState({ 
            title: "",
            description: "",
            test: "",
            tutor:"VtP4AYQR5TkO6YcPJyBI",
            category: "videos-academia-free",
            tag: "defi",
            tagAP: "clases",
            videoUrl: "",
            document: "no",
            documentUrl: ""
    });

    const onVideoChange = async (e) =>{
        const file = e.target.files[0];
        setVideoToUpdate(file);
    }
    const onDocumentChange = async (e) =>{
        const file = e.target.files[0];
        setDocumentToUpdate(file);
    }

    const handleChange = e =>{
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        });
    };

    const createVideo = async () =>{
        const storageVideoRef = app.storage().ref(values.category)
        const videoRef = storageVideoRef.child(videoToUpdate.name)
        const bytes = (await (videoRef.put(videoToUpdate))).bytesTransferred
        console.log("bytesVideo", bytes)
        setVideoUrl( await videoRef.getDownloadURL())
    }

    const createDocument = async () =>{
        const storageDocumentRef = app.storage().ref("documents")
        const documentRef = storageDocumentRef.child(documentToUpdate.name)
        await (documentRef.put(documentToUpdate)).then((res)=>{
            console.log("respuesta::", res.metadata)
        })
        const url = await documentRef.getDownloadURL();
        db.collection('documents').add({
            name: documentToUpdate.name,
            documentUrl: url,
        }).then((res)=>{
            setDocumentId(res.id)
        })
    }

    const createTest = async (videoId) =>{
        db.collection('tests').doc(videoId).set({
            videoName: values.title,
            videoId: videoId,
            url: values.test,
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setShowSpiner(true)
        await createVideo();
        if(!documentToUpdate){
            return
        }
        await createDocument();
    } 

    useEffect(async () => {
        if(!videoUrl){
            return
        }
       try {
        db.collection(`${values.category}`).add({
            title: values.title,
            description: values.description, 
            tutor: values.tutor,
            category: values.category,
            tag: values.tag,
            tagAP: values.tagAP,
            url: videoUrl,
            document: values.document,
            documentId: values.document === "si" ? documentId : "no document",
            created: firebase.firestore.FieldValue.serverTimestamp()
        }).then((res)=>{
            const videoID = res.id;
            createTest(videoID)
        })
       } catch (error) {
           console.log(error.message)
       }
        setShowSpiner(false)
        handleClose();
        console.log("success");
    }, [videoUrl])

    return(
        <Backdrop onClick={handleClose}>
            <div 
                onClick={(e) => e.stopPropagation()}
                className={styles.Modal}
            >
                <button onClick={handleClose}> <AiFillCloseCircle/> </button>
                {showSpiner ? 
                    <>
                        <h1>Cargando video al storage, esto tardará unos minutos.</h1>
                        <SpinerInfinity/>
                    </>

                    :

                    <div className={styles.contactForm}>
                        <h2 className={styles.formTitle}>Create Mater Class<br/></h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{padding: "1rem"}}>
                                <div className={styles.inputBox}>
                                    <input type='text' name="title" required="required" onChange={handleChange} value={values.title}/>
                                    <span>Titulo</span>
                                </div>
                                <div className={styles.inputBox}>
                                    <input type='text' name="description" required="required" onChange={handleChange} value={values.description}/>
                                    <span>Descripción</span>
                                </div>
                                <div className={styles.inputBox}>
                                    <input type='text' name="test"  onChange={handleChange} value={values.test}/>
                                    <span>Url Test: Google Forms</span>
                                </div>
                                

                                <div className={styles.inputVideo} onClick={() => videoPickerRef.current.click()}>
                                    Seleccionar video
                                    <input hidden ref={videoPickerRef} type='file' required="required" accept="video/*" onChange={onVideoChange} />
                                </div>

                                {videoToUpdate &&
                                    <div style={{display: "block"}}>   
                                        <p> <strong>Video:</strong> {videoToUpdate.name}</p>
                                        <p  
                                            onClick={()=> setVideoToUpdate(null)}
                                            style={{
                                                color: "red", 
                                                cursor: "pointer",
                                                width: "200px", 
                                                }}
                                        >
                                            Quitar video y subir otro
                                        </p>
                                    </div>
                                }
                                <div className={`${styles.inputBox} ${styles.inputSelect}`}>
                                    <span style={{position: "relative"}}>¿PDF de video?</span>
                                    <select name="document" value={values.document} onChange={handleChange} >
                                        <option value="si">SÍ</option>
                                        <option value="no">NO</option>
                                    </select>
                                </div>
                                {values.document === "si" ? 
                                    <div className={styles.inputVideo} onClick={() => documentPickerRef.current.click()}>
                                        Seleccionar Documento
                                        <input 
                                            name='document'
                                            hidden 
                                            ref={documentPickerRef} 
                                            type='file' 
                                            onChange={onDocumentChange} 
                                            accept="image/*,.pdf" 
                                            required
                                        />
                                    </div>  
                                    : 
                                    null
                                }

                                {documentToUpdate &&
                                    <div style={{display: "block"}}>   
                                    <p> <strong>Documento:</strong> {documentToUpdate.name}</p>
                                    <p  
                                        onClick={()=> setDocumentToUpdate(null)}
                                        style={{
                                            color: "red", 
                                            cursor: "pointer",
                                            width: "200px", 
                                            }}
                                    >
                                        Quitar documento y subir otro
                                    </p>
                                    </div>
                                    
                                }
                            </div>

                            <div style={{padding: "1rem"}}>
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

                            </div>
                        </form>
                    </div>
                }
            </div>
        </Backdrop>
    )
};

export default Modal;