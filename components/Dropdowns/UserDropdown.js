import Link from "next/link";
import {app} from '../../firebaseClient';
import { useRouter } from "next/router";
import AdminButtons from 'components/AdminButtons/AdminButtons';
import styles from '../../styles/AdminNavbar.module.css'; 
import HeaderItem from "components/Headers/HeaderItem";
import { RiVideoUploadFill, RiUserFill, RiUserAddFill } from "react-icons/ri"; 
import { FiLogOut } from "react-icons/fi";

const UserDropdown = ({user}) => {  

  return (
    <>
      {user && user.role === "admin" ? <AdminButtons/> : null}
      <div className="items-center flex">
        <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
          <img
            alt="imagen profile"
            className="w-full rounded-full align-middle border-none shadow-lg"
            src={user && user.image ? `${user.image}` : `/img/avatar.svg`}
          />
        </span>
      </div>
      <div className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
        <div className="relative flex w-full flex-wrap items-stretch">
          <h2 className={styles.name}>{user ? user.firstName : null}</h2>
        </div>
      </div>

      
    </>
  );
};

export default UserDropdown;
