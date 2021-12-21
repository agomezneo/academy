import Form from "layouts/Form";
import {useRouter} from 'next/router';

function Test({tests}) {

    const router = useRouter();
    console.log("", tests)
    return (
        <>
        <div style={{padding: "2rem"}}>
            <p style={{color: "red", fontSize: "4rem"}}>Test id ::: {router.query.id}</p> 
        </div>
        </>
    )
}

Test.layout = Form;

export default Test

export async function getServerSideProps({params}){
    const res = await fetch('http://localhost:3000/tests');
    const tests = await res.json();

    return {
        props: {
            tests
        }
    }
}

