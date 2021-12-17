import React, {useState ,useEffect} from 'react';
import Form from '../../layouts/Form';
import styles from '../../styles/FormLayout.module.css';
import {useAuth} from 'context/auth/auth';
import { useRouter } from "next/router";
import {app, db} from '../../firebaseClient';
import SpinerInfinity from 'components/Spiners/Spiner';


function Formm() {

    const {currentUser} = useAuth();
    const router = useRouter(); 
    useEffect( async () => {
      if(!currentUser){
        router.push("/auth/login")
      }
    }, [currentUser])

    const [fileUrl, setFileUrl] = useState(null)  
    const [videos, setVideos] = useState([])
    const [file, setFile] = useState(null)
    const [showSpiner, setShowSpiner] = useState(false)
    const [userName, setUserName] = useState(null)

    const onFileChange = async (e) =>{
      const file = e.target.files[0];
      setFile(file)
      /* const storageRef = app.storage().ref()
      const fileRef = storageRef.child(file.name)
      const bytes = (await (fileRef.put(file))).bytesTransferred

      console.log(bytes)

      setFileUrl( await fileRef.getDownloadURL() ) */
    }

    console.log(file)

    const onSubmit = async (e) =>{
      e.preventDefault();
      const userName = e.target.userName.value;
      setUserName(userName)
      setShowSpiner(true)
      const storageRef = app.storage().ref()
      const fileRef = storageRef.child(file.name)
      const bytes = (await (fileRef.put(file))).bytesTransferred
      console.log(bytes)
      setFileUrl( await fileRef.getDownloadURL() )

    }

    useEffect(() => {
      if(userName && fileUrl){
        db.collection("ExampleVideos").doc(userName).set({
          name: userName,
          videoUrl: fileUrl
        })
        setShowSpiner(false)
      }
    }, [fileUrl])

    useEffect(() => {
      const fetchVideos = async () =>{
        const videosCollection = db.collection("ExampleVideos").get()
        setVideos((await videosCollection).docs.map(doc =>{
          return doc.data()
        }))
      }
      fetchVideos();
    }, [])

    console.log(fileUrl)

    return (
        <>


        <form onSubmit={onSubmit}>
          <input type="file" onChange={onFileChange} />
          <input type="text" name="userName" placeholder='Name'/>
          <button type='submit'>Enviar</button>
        </form>

        {showSpiner ? 

          <SpinerInfinity/>

          : 

          null
        }

        <ul>
          {videos.map(video =>{
            return 
              <li key={video.name}>
                <video src={video.videoUrl}/>
                <p>{video.name}</p>
              </li>
          })}
        </ul>

        {/* {currentUser &&
            <Form>
                <iframe id="googleForm" className={styles.form} src="https://docs.google.com/forms/d/e/1FAIpQLScSRkEDavrHVyDbMX3RFGdF1tfWlR-ljtM7fl9McaKEgGTb7A/viewform?embedded=true" width="700" height="1000px" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
            </Form>
        } */}
        </>
    )
}

export default Formm
