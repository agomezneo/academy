import React, {useState, useEffect} from 'react'
import MaterialTable from 'material-table';
import { useAuth } from "context/auth/auth";
import { app } from "firebaseClient";
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';


function UsersTable() {

    const columns = [
        {
            title: "Nombre",
            field: "firstName"
        },
        {
            title: "Apellido",
            field: "lastName"
        },
        {
            title: "Membresia",
            field: "membership"
        },
        {
            title: "Email",
            field: "email"
        },
        {
            title: "Teléfono",
            field: "phone",
            type: "numeric"
        }
       
    ]

    const {user} = useAuth();
    const db = app.firestore()
  
    const [users, setUsers] = useState([])
  
  
    useEffect(() => {
      if(!user){
        return
      }
      if(user && user.role == "admin"){
          db.collection("users").onSnapshot((res) =>{
              const docs = [];
              res.forEach((doc)=>{
                  docs.push({...doc.data(), id:doc.id})
              })
              setUsers(docs)
          })
      }
  }, [user])
  
  console.log(users)

    return (
    <>
       <MaterialTable
            title="Usuarios Proyecto NEO"
            columns={columns}
            data={users}
            actions={[
                {
                    icon: 'edit', 
                    tooltip: 'Editar usuario',
                    onClick: (event, rowData) => alert('Crear función para editar usuario' +rowData.firstName)
                },
                {
                    icon: 'delete', 
                    tooltip: 'Editar usuario',
                    onClick: (event, rowData) => alert('Crear función para editar usuario' +rowData.firstName)
                },
            ]}
            options={{
                actionsColumnIndex: -1
            }}
            localization={{
                header:{
                    actions: "Acciones"
                }
            }}
       />
    </>
    )
}

export default UsersTable
