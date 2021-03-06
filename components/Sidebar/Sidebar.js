import React, {useState} from "react";;
import styles from "../../styles/AdminNavbar.module.css"
import Link from "next/link";
import { useRouter } from "next/router"; 
import UserDropdown from "components/Dropdowns/UserDropdown.js"; 
import {auth} from '../../firebaseClient';
import { useAuth } from "../../context/auth/auth";
import { GiTestTubes, GiBookmark, GiVideoCamera } from "react-icons/gi";
import { GoSignOut } from "react-icons/go";

export default function Sidebar({signOut, user}) {

  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();

  const closeSesion = () =>{ 
    auth.signOut(); 
    router.push("/auth/login")
  }

  const [isOpen, setIsOpen] = useState(true);
  const open = () =>{
    setIsOpen(state => !state)
    setCollapseShow(`${styles.sidebarMovilMenu}`)
  }

  return (
    <>
      <nav 
          className={`md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 
          ${styles.sidebar}`}
      >
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <div 
              className={!isOpen ? `${styles.menuBars} ${styles.open}` : styles.menuBars}
              onClick={open}
          >
            <div className={styles.btnBurger}></div>
          </div>
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              {/* <NotificationDropdown /> */}
            </li>
            <li className="inline-block relative">
              <UserDropdown/>
            </li>
          </ul>
          <Link href="/">
            <a
              href="#pablo"
              className="md:block text-left md:pb-2 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            >
              ACADEMIA PROYECTO NEO 
            </a>
          </Link>
          <div
            className={
              `md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ${!isOpen ? collapseShow : "hidden" }`
              
            }
          >
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a
                      href="#pablo"
                      className="md:block text-left md:pb-2  mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    >
                      ProyectoNEO
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            {/* Divider */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/admin/dashboard">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold" +
                      (router.pathname.indexOf("/admin/dashboard") !== -1
                        ? " hover:text-lightBlue-600"
                        : " hover:text-blueGray-500")
                    }
                    style={{
                      display: "flex",
                      alignItems: "center", 
                    }}
                  >
                    <GiVideoCamera
                      className={
                        "mr-2" +
                        (router.pathname.indexOf("/admin/dashboard") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                      style={{fontSize: "2rem"}}
                    />{" "}
                    Dashboard
                  </a>
                </Link>
              </li>
              {user && user.role === "admin" ?

                <li className="items-center">
                  <Link href="/admin/tables">
                    <a
                      href="#pablo"
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/admin/tables") !== -1
                          ? "hover:text-lightBlue-600"
                          : "hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-table mr-2 text-sm " +
                          (router.pathname.indexOf("/admin/tables") !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>{" "}
                      Tablas
                    </a>
                  </Link>
                </li>

                : 

                null
                      
              }
              
              <li className="items-center">
                <Link href="/admin/documents">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/documents") !== -1
                        ? " hover:text-lightBlue-600"
                        : " hover:text-blueGray-500")
                    }
                    style={{display: "flex"}}
                  >
                    <GiBookmark 
                      className={
                        "mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/documents") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    />{" "}
                    Documentos
                  </a>
                </Link>
              </li>
              <li className="items-center">
                <Link href="/admin/tests">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/tests") !== -1
                        ? " hover:text-lightBlue-600"
                        : " hover:text-blueGray-500")
                    }
                    style={{display: "flex"}}
                  >
                    <GiTestTubes 
                      className={
                        "mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/tests") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    />{" "}
                    Tests
                  </a>
                </Link>
              </li>
              <li className="items-center">
                <Link href="/admin/settings">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/settings") !== -1
                        ? " hover:text-lightBlue-600"
                        : " hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-tools mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/settings") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Configuraci??n
                  </a>
                </Link>
              </li>
              <li className="items-center" style={{cursor: "pointer", display: "flex"}}>
                  <div
                    onClick={closeSesion}
                    className="hover:text-blueGray-500 text-xs uppercase py-3 font-bold"
                    style={{display: "flex"}}
                  >
                    <GoSignOut className="text-blueGray-400 mr-2 text-sm" />{" "}
                    Cerrar Sesi??n
                  </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
