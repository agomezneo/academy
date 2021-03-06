import React, {useState, useEffect} from "react";
import { db } from '../../firebaseClient';
import Auth from "layouts/Auth.js";
import router, {useRouter} from "next/router";

import {useAuth} from 'context/auth/auth';

export default function Register() {

    const {singUp} = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
      firstName: '',
      email: '',
      password: '',
      passwordConfirm:'',
      phone:'',
      avisoLegal: false,
      descargoDeResponsabilidad: false,
      date: new Date(),
    });

    const handleChange = e =>{
        const value =
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value;
        setValues({
            ...values,
            [e.target.name]: value
        });
    };

    const register = async (e) =>{
      e.preventDefault();
   
      if(values.password !== values.passwordConfirm){
        return setError('La contraseña no coincide')
      }
      try{
        setError('')
        setLoading(true)
         const userCreated = await singUp(values.email, values.password);
         if(userCreated){
          db.collection('users').doc(userCreated.user.uid).set({ 
            firstName : values.firstName,
            email: values.email,
            phone: values.phone,
            role: "admin",
            membership: "TOTAL" 
          });
          router.push('/');
         }
      }
      catch(error){
        console.error(error.message)
        if(error.message === "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."){
          alert("El email ya esta registrado")
        }
      } 
        setLoading(false)
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Crear cuenta con 
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Crear cuenta con tu email</small>
                </div>
                {error && <h2>{error}</h2>}
                <form onSubmit={register}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      type='text' 
                      name="firstName" 
                      value={values.firstName}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nombre"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type='email' 
                      name="email" 
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Telefono
                    </label>
                    <input
                      type='number' 
                      name="phone" 
                      id="phone"
                      value={values.phone}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Número"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Contraseña
                    </label>
                    <input
                      type='password' 
                      name="password" 
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Confirma contraseña
                      </label>
                      <input
                        type='password' 
                        name="passwordConfirm" 
                        id="passwordConfirm"
                        value={values.passwordConfirm}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Confirmar contraseña"
                      />
                    </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type='checkbox' 
                        name="descargoDeResponsabilidad" 
                        value={values.descargoDeResponsabilidad} 
                        onChange={handleChange}
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Acepto la {" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Politica de privacidad
                        </a>
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type='checkbox' 
                        name="avisoLegal" 
                        value={values.avisoLegal} 
                        onChange={handleChange}
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        He leido y acepto el {" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Registro en ProyectoNEO
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      disabled={loading}
                    >
                      Crear Cuenta
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
