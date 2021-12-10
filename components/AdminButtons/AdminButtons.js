import React, {useState} from 'react';
import styles from '../../styles/AdminNavbar.module.css';
import Modal from 'components/Modals/UpdateVideo'; 

function AdminButtons() {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const closeModal = () => setModalOpen(false);
    const closeModal1 = () => setModalOpen1(false);
    const openModal = () => setModalOpen(true);
    const openModal1 = () => setModalOpen1(true);

    const updateVideo = (e) =>{
        e.preventDefault();
        alert("Subiendo video...")
    }

    const registerUser = (e) =>{
        e.preventDefault();
        alert("registrando usuario");
    }
    return (
        <div className={styles.buttonsContainer}>
            <div 
                className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}
                style={{cursor: "pointer"}}
                onClick={() => (modalOpen ? closeModal() : openModal())}
            >
                Subir Video
            </div>
            <div 
                className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}
                style={{cursor: "pointer"}}
                onClick={() => (modalOpen1 ? closeModal1() : openModal1())}
            >
                Registrar Usuario
            </div>
            {modalOpen  && <Modal  modalOpen={modalOpen} handleClose={closeModal}/>}
            {modalOpen1  && <Modal  modalOpen1={modalOpen1} handleClose={closeModal1}/>}
        </div>
    )
}

export default AdminButtons
