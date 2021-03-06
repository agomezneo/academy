import styles from '../../styles/AdminNavbar.module.css'

const Backdrop = ({children, onClick}) =>{
   return(
       <div
        className={styles.Backdrop}
        onClick={onClick}
       >
           {children}
       </div>
   ) 
};

export default Backdrop;