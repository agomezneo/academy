import React, {useRef} from 'react';
import styles from '../../styles/VideoGallery.module.css';
import Image from 'next/image';
import {app, db} from '../../firebaseClient';
import firebase from "firebase/compat/app"

function VideoCommentInput({idVideo, user}) {

    const inputRef = useRef(null)
    const sendComment = (e) =>{
        e.preventDefault();
        if(!inputRef.current.value) return
        db.collection('videoComments').add({
            idVideo: idVideo,
            message: inputRef.current.value, 
            name: user.firstName,
            email: user.email,
            image: user.image ? user.image : '', 
            created: firebase.firestore.FieldValue.serverTimestamp() 
        })

        inputRef.current.value = ''

    }

    

    return (
        <div className={`bg-white p-2 shadow-md text-gray-500 font-medium mt-6 rounded-lg ${styles.VideoCommentInput}`}>
            <div className={`flex flex-1 space-x-4 p-4 items-center `}>
                <Image
                    className="rounded-full"
                    src={user.image ? `${user.image}` : `/img/avatar.svg`}
                    width={100}
                    height={100}
                    layout="fixed"
                />
                <form className="flex flex-1">
                    <input 
                        className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                        type="text" 
                        ref={inputRef}
                        placeholder={`¿Que tienes en mente,  ${user.firstName}?`} 
                    /> 
                    <button type="submit" hidden onClick={sendComment}>Comentar</button>   
                </form> 
            </div>
        </div>
    )
}

export default VideoCommentInput
