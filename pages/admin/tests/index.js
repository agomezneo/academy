import React, {useEffect} from 'react'
import { Link } from "@material-ui/core";
import {useRouter} from 'next/router';
import {useAuth} from 'context/auth/auth';
import Admin from "layouts/Admin";
import { BsJournalCheck } from "react-icons/bs";


function Documents({tests}) {
   
    const router = useRouter();
    const {currentUser} = useAuth();
    useEffect( async () => {
      if(!currentUser){
        router.push("/auth/login")
      }
    }, [currentUser])

    return (
       <>
       {currentUser &&
            
            <div 
                style={{
                    padding: "2rem", 
                    display: "flex", 
                    flexDirection:"row",
                    flexWrap:"wrap",
                    gap: "5rem",
                    top: "10vh",
                    position: "relative",
                    justifyContent: "center"
                }}
            >
                {tests.map((test, key)=>{
                    return(
                        <ul key={key}>
                            <li>
                                <Link href={`/admin/tests/${test.videoId}`}  style={{display: "block", alignItems: "flex-end"}}>
                                    <a style={{width: "150px", display: "block", alignItems: "center", justifyContent: "center"}}>
                                        <BsJournalCheck style={{color: "#3dae2a", fontSize: "5rem"}}/>
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <span style={{fontSize: "1rem", color: "#3dae2a"}}>Test del video:</span>
                                            <span style={{fontSize: "1rem", color: "#3dae2a"}}>{test.videoName}</span>
                                        </div>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    )
                })
                }
            </div>

        }
       </>
    )
}

Documents.layout = Admin;

export default Documents

export async function getServerSideProps(){
    const res = await fetch('http://localhost:3000/tests');
    const tests = await res.json();

    return {
        props: {
            tests
        }
    }
}
