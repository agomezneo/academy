import React, {useState, useEffect} from 'react';
import styles from '../../styles/VideoGallery.module.css';
import {db} from '../../firebaseClient';
import VideoCommentInput from 'components/Inputs/VideoCommentInput';
import Comment from '../Inputs/Comment';
import Image from 'next/image';
import Link from 'next/link';
import {BsChevronDoubleUp, BsChevronDoubleDown, BsFileEarmarkPdfFill, BsJournalCheck } from "react-icons/bs";
import { SiTelegram } from "react-icons/si";
import {useAuth} from 'context/auth/auth';
import SpinerInfinity from 'components/Spiners/Spiner';
import { GiTestTubes } from 'react-icons/gi';

 function VideoGallery ({tests}) {

    /* useEffect(() => {
        const doc = document;
        doc.oncontextmenu = () =>{ 
            return false
        }
    }, [document]) */

    const [user, setUser] = useState(null)
    const {currentUser} = useAuth();

    useEffect(() => {
        if(currentUser){
            db.collection("users").doc(currentUser.uid).get().then(doc =>{
                setUser(doc.data())
            })
        }
    }, [currentUser])

    const [test, setTest] = useState(null)
    const [videos , setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState();
    const [comments, setComments] = useState()
    const [biblioteca, setBiblioteca] = useState(false)
    const [closerInformation, setCloserInformation] = useState(true)
    const [profileTutor, setProfileTutor] = useState()
    const [tutorFound, setTutorFound] = useState(false)
    const [pdf, setPdf] = useState(null)
   
     const getRef = () =>{
        if(!user){
         return
        }

        if(user.membership === "FREE"){
            return "videos-academia-free"
        }else if(user.membership === "PLUS"){
            return "videos-biblioteca"
        }
        return "videosAcademiaEnero"
    }

    useEffect( async () => {
        if(!user){
            return  
        }
        const ref = getRef();
        db.collection(ref).orderBy("created", "asc").onSnapshot((res) =>{
            const docs = []; 
            res.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id})
        })
            setVideos(docs)
            setSelectedVideo(docs[0])
        })
    }, [user])

    useEffect(() => {
        if(selectedVideo){
            const docRef = db.collection("profile-tutors").doc(selectedVideo.tutor);
            docRef.get().then(doc => {
                if (doc.exists) {
                    setProfileTutor(doc.data())
                    setTutorFound(true)
                } else {
                    setTutorFound(false)
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
    }, [selectedVideo])
    
    const getVideosFree = () =>{
        db.collection('videos-academia-free').orderBy("created", "asc").onSnapshot((res) =>{
            const videosDefi = [];
            res.forEach((doc)=>{
                videosDefi.push({...doc.data(), id:doc.id})
            })
            setVideos(videosDefi);
            setSelectedVideo(videosDefi[0])
            
        })
    }
    const getVideosBiblioteca= () =>{
        db.collection('videos-biblioteca').orderBy("created", "asc").onSnapshot((res) =>{ 
            const videosDefi = [];
            res.forEach((doc)=>{
                videosDefi.push({...doc.data(), id:doc.id})
            })
            setVideos(videosDefi);
            setSelectedVideo(videosDefi[0])
            
        })
        setBiblioteca(!biblioteca)
    }
    const getVideosPro = () =>{
        db.collection('videosAcademiaEnero').orderBy("created", "asc").onSnapshot((res) =>{
            const videosDefi = [];
            res.forEach((doc)=>{
                videosDefi.push({...doc.data(), id:doc.id})
            })
            setVideos(videosDefi);
            setSelectedVideo(videosDefi[0])
           
        })
        setBiblioteca(!biblioteca)
    }
    const getVideosWithTagDefi = () =>{
        db.collection('videos-biblioteca').where("tag", "==" , "defi").orderBy("created", "asc").onSnapshot((res) =>{
            const videosDefi = [];
            res.forEach((doc)=>{
                videosDefi.push({...doc.data(), id:doc.id})
            })
            setVideos(videosDefi);
            setSelectedVideo(videosDefi[0])
        })
    }
    const getVideosWithTagTrading = () =>{
        db.collection('videos-biblioteca').where("tag", "==" , "trading").orderBy("created", "asc").onSnapshot((res) =>{
            const videosDefi = [];
            res.forEach((doc)=>{
                videosDefi.push({...doc.data(), id:doc.id})
            })
            setVideos(videosDefi);
            setSelectedVideo(videosDefi[0])
        })
    }
    const getVideosWithTagCrypto = () =>{
        db.collection('videos-biblioteca').where("tag", "==" , "crypto").orderBy("created", "asc").onSnapshot((res) =>{
            const videosDefi = [];
            res.forEach((doc)=>{
                videosDefi.push({...doc.data(), id:doc.id})
            })
            setVideos(videosDefi);
            setSelectedVideo(videosDefi[0])
        })
    }

    useEffect(() => {
        if(selectedVideo){
            db.collection("videoComments").where("idVideo", "==", selectedVideo.id).orderBy("created", "asc").onSnapshot((res) =>{
                const docss = [];
                res.forEach((doc)=>{
                    docss.push({...doc.data(), id:doc.id})
                })
                setComments(docss.sort((a, b)=>{
                  const firstComment =  new Date(b.created?.toDate())
                  const endComment = new Date(a.created?.toDate())
                  return firstComment - endComment
                }))
            })
        }
    }, [selectedVideo]);
    
    const chooseVideo = (i) =>{
        setSelectedVideo(i)
    };

    const closeInfomation = () =>{
        setCloserInformation(!closerInformation) 
    } 

    
    useEffect(() => {
        if(!selectedVideo){
            return
        }
        db.collection("documents").doc(selectedVideo.documentId).onSnapshot((res)=>{
            setPdf(res.data())
        })
            
    }, [selectedVideo])

    useEffect(() => {
        if(!selectedVideo){
            return
        }
        db.collection("tests").doc(selectedVideo.id).onSnapshot((res)=>{
            console.log(res.data())
            setTest(res.data())
        })
            
    }, [selectedVideo])

    console.log(test)

    return ( 
        <>
        {!selectedVideo || !videos ? <SpinerInfinity/>  : videos ? 
            <div className={styles.VideoGallery} id="main-video">
                <div className={styles.videoGallery_header}>
                    <h2>{user.membership === "PLUS" ? "BIBLIOTECA" : `ACADEMIA ${user.membership}`} </h2>
                    {user.role === "admin" ?
                        <>
                            <div className={styles.filterButtons_container}>
                                <a href="#video-list" className={styles.filterButton} onClick={getVideosFree}>Videos Free</a>
                                <a href="#video-list" className={styles.filterButton} onClick={getVideosBiblioteca} >Biblioteca</a>
                                <a href="#video-list" className={styles.filterButton} onClick={getVideosPro}>Videos Pro</a>
                                <a href="#video-list" className={styles.filterButton} onClick={getVideosWithTagDefi}>DEFI</a>
                                <a href="#video-list" className={styles.filterButton} onClick={getVideosWithTagTrading} >TRADING</a>
                                <a href="#video-list" className={styles.filterButton} onClick={getVideosWithTagCrypto}>CRYPTO</a>
                            </div>
                        </>
                        :
                        null
                    }
                    {user.membership === "PRO" ?
                        <div className={styles.filterButtons_container}>
                            {biblioteca ? 
                                <div className={styles.filterButtons_container}>
                                    <div className={styles.filterButton} onClick={getVideosPro} >ACADEMIA PRO</div>
                                    <div className={styles.filterButtons_tagsContainer}>
                                        <h3>CARGAR VIDEOS POR CATEGORIA</h3>
                                        <div className={styles.filterButtons_container}>
                                            <div className={styles.filterButton} onClick={getVideosWithTagDefi}>DEFI</div>
                                            <div className={styles.filterButton} onClick={getVideosWithTagTrading} >TRADING</div>
                                            <div className={styles.filterButton} onClick={getVideosWithTagCrypto}>CRYPTO</div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className={styles.filterButton} onClick={getVideosBiblioteca}>IR A BIBLIOTECA</div>
                            }
                        </div>
                        :
                        null
                    }
                    {user.membership === "PLUS" ?
                        <div className={styles.filterButtons_container}>
                            <div className={styles.filterButton} onClick={getVideosWithTagDefi}>DEFI</div>
                            <div className={styles.filterButton} onClick={getVideosWithTagTrading} >TRADING</div>
                            <div className={styles.filterButton} onClick={getVideosWithTagCrypto}>CRYPTO</div>
                        </div>
                        :
                        null
                    }
                </div>
                <div className={styles.container}>
                    <div className={styles.mainVideo} >
                        <div className={styles.video}>
                            <video src={selectedVideo.url} controls controlsList="nodownload"/> 
                            <div className={!closerInformation ? `${styles.informationVideo}` : `${styles.informationCloser}`}>
                                <div className={styles.informationVideo_text}>
                                    <h3 className={styles.videoPrincipalTitle}>{selectedVideo.title}</h3>
                                    <p>{selectedVideo.description}</p>
                                    {selectedVideo.title === "Bienvenida del Socio Plus" ? 
                                        <a className={styles.telegramButton} href="https://t.me/+qkouAv-mtPkwMzZk"  target= "_blank">
                                            <SiTelegram/> <span>Ir a nuestro canal de Telegram</span>
                                        </a>
                                        :
                                        null
                                    }
                                    {selectedVideo.title === "Bienvenida del Curso Pro" ? 
                                        <a className={styles.telegramButton} href="https://t.me/+6jrjrUj486NhNDY0"  target= "_blank">
                                            <SiTelegram/> <span>Ir a nuestro canal de Telegram</span>
                                        </a>
                                        :
                                        null
                                    }
                                </div>
                                <div>
                                    <div className="bg-white p-2 rounded-lg">
                                        {profileTutor && tutorFound ?
                                            <div className={`flex flex-1 p-2 items-center ${styles.informationVideo_tutor}`}>
                                                <div className={styles.informationVideo_tutorContainer}>
                                                    <div className={styles.informationVideo_tutorContainer_Name}>
                                                        <Image
                                                            className="rounded-full"
                                                            src={profileTutor ? profileTutor.profileImage : "/img/avatar.svg"}
                                                            width={40}
                                                            height={40}
                                                            layout="fixed"
                                                        />
                                                        <div className="h-12 flex-grow px-2 flex items-center">
                                                            <h3>{profileTutor.firstName} {profileTutor.lastName}</h3>
                                                        </div> 
                                                    </div>
                                                </div>
                                                <h2>TUTOR</h2>
                                            </div>

                                            :

                                            <p>No hay informaci??n del tutor</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div onClick={closeInfomation} className={styles.informationCloserButton}>{!closerInformation ? <BsChevronDoubleUp/> : <><p>Informaci??n del video</p><BsChevronDoubleDown /></>}</div>
                        </div>
                    </div>
                    <div className={styles.videoList} id="video-list">
                        {videos.map((video, key)=>{
                            return(
                            <a href="#main-video" key={key} className={selectedVideo.id === video.id ? `${styles.videoList_Video} ${styles.active}` : `${styles.videoList_Video}`} onClick={() => chooseVideo(video)}>
                                <video src={video.url}/>
                                <h3 className={styles.videoTitle}> {video.title}</h3>
                            </a>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.socialComments}>
                    <h2 className={styles.socialComments_title}>Comentarios e inquietudues.</h2>
                    <div className={styles.commentsContainer}>
                        <div>
                            <VideoCommentInput user={user} idVideo={selectedVideo.id}/>
                            <div className={styles.commentsContainer_}>
                                {comments?.map((comment, key)=>{
                                    return(
                                        <>
                                            <Comment 
                                                className={styles.comment}
                                                key={key}
                                                image={comment.image}
                                                name={comment.name}
                                                message={comment.message}
                                                created={new Date(comment.created?.toDate()).toLocaleString()}
                                            />
                                        </>
                                    )
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.documents}>
                            <h3 style={{marginBottom: "1rem"}}>Recursos:</h3>
                            {pdf && 
                                <a href={pdf.documentUrl} target= "_blank" style={{display: "flex", alignItems: "flex-end"}}>
                                    <BsFileEarmarkPdfFill style={{color: "red", fontSize: "5rem"}}/>
                                    <span style={{fontSize: "1rem", color: "#3dae2a"}}>{pdf.name}</span>
                                </a>
                            }
                            <h3 style={{marginBottom: "1rem"}}>Test del video:</h3>
                                {test && 
                                    <Link href={`/admin/tests/${test.videoId}`}  style={{display: "flex", alignItems: "flex-end"}}>
                                        <a style={{display: "flex", alignItems: "flex-end"}}>
                                            <BsJournalCheck style={{color: "#3dae2a", fontSize: "5rem"}}/>
                                            <span style={{fontSize: "1rem", color: "#3dae2a"}}>{test.videoName}</span>
                                        </a>
                                    </Link>
                                }
                            
                        </div>
                    </div>
                </div>
            </div>

        :   

        <h1>Loading....</h1>

        }
        </>
    )
}

export default VideoGallery;
