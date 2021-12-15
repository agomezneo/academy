import React, {useEffect} from 'react';
import Admin from 'layouts/Admin';
import VideoGallery from 'components/Video/VideoGallery';
import {useAuth} from 'context/auth/auth';
import { useRouter } from "next/router";


export default function Index() {
    const {userInfo, currentUser} = useAuth();
    const router = useRouter(); 
  
    useEffect( async () => {
      if(!currentUser){
        router.push("/auth/login")
      }
    }, [currentUser])

    return (
      <>
      {currentUser &&
        <Admin>
          <VideoGallery/>   
        </Admin>
      }
      </>
    )
}
