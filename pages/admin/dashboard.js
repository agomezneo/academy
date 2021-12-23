import React, {useEffect} from 'react';
import Admin from 'layouts/Admin';
import VideoGallery from 'components/Video/VideoGallery';
import {useAuth} from 'context/auth/auth';
import { useRouter } from "next/router";

export default function Index({quizes}) {
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
          <VideoGallery tests={quizes}/>   
        </Admin>
      }
      </>
    )
}

export async function getServerSideProps(){
  const res = await fetch('http://localhost:3000/tests');
  const quizes = await res.json();

  return {
      props: {
          quizes
      }
  }
}
