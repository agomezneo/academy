import React, {useState, useEffect} from 'react';
import styles from '../../styles/VideoGallery.module.css';
import {db} from '../../firebaseClient';
import VideoCommentInput from 'components/Inputs/VideoCommentInput';
import Comment from '../Inputs/Comment';
import Image from 'next/image';
import {BsChevronDoubleUp, BsChevronDoubleDown } from "react-icons/bs";
import { SiTelegram } from "react-icons/si";
import {useAuth} from 'context/auth/auth';


function VideoGallery () {

    const [user, setUser] = useState(null)
    const {currentUser} = useAuth();

    useEffect(() => {
        if(currentUser){
            db.collection("users").doc(currentUser.uid).get().then(doc =>{
                console.log(doc.data())
                setUser(doc.data())
            })
        }
        console.log(currentUser.uid);
    }, [currentUser])

    

    
    /* useEffect(() => {
        const doc = document;
        doc.oncontextmenu = () =>{ 
            return false
        }
    }, [document]) */

    const [videos , setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState();
    const [loadedVideos, setLoadedVideos] = useState(false)
    const [comments, setComments] = useState()
    const [biblioteca, setBiblioteca] = useState(false)
    const [closerInformation, setCloserInformation] = useState(true)
    const [profileTutor, setProfileTutor] = useState()
    const [tutorFound, setTutorFound] = useState(false)

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

    useEffect(() => {
        if(!user){
            return  
        }
        console.log(user)
        const ref = getRef();
        db.collection(ref).onSnapshot((res) =>{
            const docs = []; 
            res.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id})
            })
            setVideos(docs)
            setSelectedVideo(docs[0])
            setLoadedVideos(true)
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
        db.collection('videos-academia-free').onSnapshot((res) =>{
            const videosDefi = [];
            res.forEach((doc)=>{
                videosDefi.push({...doc.data(), id:doc.id})
            })
            setVideos(videosDefi);
            setSelectedVideo(videosDefi[0])
            setLoadedVideos(true);
        })
    }
    const getVideosBiblioteca= () =>{
        db.collection('videos-biblioteca').onSnapshot((res) =>{ 
            const videosDefi = [];
            res.forEach((doc)=>{
                videosDefi.push({...doc.data(), id:doc.id})
            })
            setVideos(videosDefi);
            setSelectedVideo(videosDefi[0])
            setLoadedVideos(true);
        })
        setBiblioteca(!biblioteca)
    }
    const getVideosPro = () =>{
        db.collection('videosAcademiaEnero').onSnapshot((res) =>{
            const videosDefi = [];
            res.forEach((doc)=>{
                videosDefi.push({...doc.data(), id:doc.id})
            })
            setVideos(videosDefi);
            setSelectedVideo(videosDefi[0])
            setLoadedVideos(true);
        })
        setBiblioteca(!biblioteca)
    }
    const getVideosWithTagDefi = () =>{
        db.collection('videos-biblioteca').where("tag", "==" , "defi").onSnapshot((res) =>{
            const videosDefi = [];
            res.forEach((doc)=>{
                videosDefi.push({...doc.data(), id:doc.id})
            })
            setVideos(videosDefi);
            setSelectedVideo(videosDefi[0])
            setLoadedVideos(true);
        })
    }
    const getVideosWithTagTrading = () =>{
        db.collection('videos-biblioteca').where("tag", "==" , "trading").onSnapshot((res) =>{
            const videosDefi = [];
            res.forEach((doc)=>{
                videosDefi.push({...doc.data(), id:doc.id})
            })
            setVideos(videosDefi);
            setSelectedVideo(videosDefi[0])
            setLoadedVideos(true);
        })
    }
    const getVideosWithTagCrypto = () =>{
        db.collection('videos-biblioteca').where("tag", "==" , "crypto").onSnapshot((res) =>{
            const videosDefi = [];
            res.forEach((doc)=>{
                videosDefi.push({...doc.data(), id:doc.id})
            })
            setVideos(videosDefi);
            setSelectedVideo(videosDefi[0])
            setLoadedVideos(true);
        })
    }

    useEffect(() => {
        if(selectedVideo){
            db.collection("videoComments").where("idVideo", "==", selectedVideo.id).onSnapshot((res) =>{
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

    /* const filterVideos = () =>{
        if(!videos){
           return
        }
        videos.sort((a, b) =>{
            return a.created.seconds - b.created.seconds;
        })
    }

    filterVideos(); */

    const closeInfomation = () =>{
        setCloserInformation(!closerInformation) 
    } 
   
    return ( 
        <>
        {!selectedVideo || !videos ? <h1 style={{marginTop: "100px", fontSize:"3rem", color:"red" }}>!Por favor cargar primer video!</h1> : loadedVideos && videos ? 
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

                                            <p>No hay información del tutor</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div onClick={closeInfomation} className={styles.informationCloserButton}>{!closerInformation ? <BsChevronDoubleUp/> : <><p>Información del video</p><BsChevronDoubleDown /></>}</div>
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
                            <h3>Documentos</h3>
                            <div>
                                <div style={{backgroundColor: "#a9a9a9", minHeight: "40px", marginTop: "10px", borderRadius:"7px"}}></div>
                                <div style={{backgroundColor: "#a9a9a9", minHeight: "40px", marginTop: "10px", borderRadius:"7px"}}></div>
                                <div style={{backgroundColor: "#a9a9a9", minHeight: "40px", marginTop: "10px", borderRadius:"7px"}}></div>
                            </div>
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

export default VideoGallery