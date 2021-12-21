import { Link } from "@material-ui/core";
import Form from "layouts/Form";
import { GrTestDesktop } from "react-icons/gr";


GrTestDesktop

function Documents({tests}) {

    console.log(tests)


    return (
        <div 
            style={{
                padding: "2rem", 
                display: "flex", 
                flexDirection:"row",
                flexWrap:"wrap"
            }}
        >
             {tests.map((test, key)=>{
                return(
                    <ul key={key}>
                        <li>
                            <Link href={`/admin/tests/[id]`} as={`/admin/tests/${test.videoId}`} style={{display: "block", alignItems: "flex-end"}}>
                                <a>
                                    <GrTestDesktop style={{color: "red", fontSize: "5rem"}}/>
                                    <span style={{fontSize: "1rem", color: "#3dae2a"}}>{test.videoName}</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                )
            })
            }
        </div>
    )
}

Documents.layout = Form;

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
