import React from 'react';
import Admin from 'layouts/Admin';
import VideoGallery from 'components/Video/VideoGallery';
import { useAuth } from "../../context/auth/auth";

export default function Index() {
  const {user} = useAuth();
    return (
      <Admin>
        <VideoGallery user={user}/>   
      </Admin>
    )
}


