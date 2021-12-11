import React, {useState, useEffect} from "react";
import { useAuth } from "../../context/auth/auth";
import {app} from '../../firebaseClient';

export default function CardSettings() {
  
  const {user, userID} = useAuth();
  const date = new Date() 
  const db = app.firestore();
  const [userValues, setUserValues] = useState({
    userName: user.userName ? user.userName : '',
    email: user.email ? user.email : '',
    firstName: user.firstName ? user.firstName : '',
    lastName: user.lastName ? user.lastName : '',
    address: user.address ? user.address : '',
    city: user.city ? user.city : '',
    country: user.country ? user.country : '',
    postalCode: user.postalCode ? user.postalCode : '',
    phone: user.phone ? user.phone : '',
    bio: user.bio ? user.bio : '', 
    upDated: date
  });

  const handleChange = e =>{
    const value =
    e.target.type === "checkbox"
      ? e.target.checked
      : e.target.value;
    setUserValues({
        ...userValues,
        [e.target.name]: value
    });
    console.log(userValues)
};


  console.log("valuesUser::", userValues)
  console.log("valuesID::", userID)


  const updateUserData = async () => {
    await db.collection("users").doc(userID).update(userValues)
    .catch(err => err.message)
    return
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Mi cuenta</h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={updateUserData}
            >
              Actualizar
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre de usuario
                  </label>
                  <input
                    id="userName"
                    type='text' 
                    name="userName" 
                    value={userValues.userName}
                    onChange={handleChange}
                    defaultValue={userValues.userName}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email 
                  </label>
                  <input
                    id="email"
                    type="email" 
                    name="email" 
                    value={userValues.email}
                    onChange={handleChange}
                    defaultValue={userValues.email}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName" 
                    value={userValues.firstName}
                    onChange={handleChange}
                    defaultValue={userValues.firstName}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName" 
                    value={userValues.lastName}
                    onChange={handleChange}
                    defaultValue={userValues.lastName}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Contact Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address" 
                    value={userValues.address}
                    onChange={handleChange}
                    defaultValue={userValues.address}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city" 
                    value={userValues.city}
                    onChange={handleChange}
                    defaultValue={userValues.city}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    País
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country" 
                    value={userValues.country}
                    onChange={handleChange}
                    defaultValue={userValues.country}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Codigo Postal
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode" 
                    value={userValues.postalCode}
                    onChange={handleChange}
                    defaultValue={userValues.postalCode}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone" 
                    value={userValues.phone}
                    onChange={handleChange}
                    defaultValue={userValues.phone}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Acerca de mi
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Acerca de mi
                  </label>
                  <textarea
                    type="text"
                    id="bio"
                    name="bio" 
                    value={userValues.bio}
                    onChange={handleChange}
                    defaultValue={userValues.bio}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
