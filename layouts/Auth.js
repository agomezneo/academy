import React from "react";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

export default function Auth({ children }) {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundColor: "#fff",
              backgroundSize: "contain", 
              backgroundPosition: "left",
              backgroundImage: "url('/img/learning.svg')",
            }}
          ></div>
          <h1 
            style={{
              color: "red",
              
            }}
          >
            ACADEMIA PRO DE PROYECTO NEO 
          </h1>
          {children}
        </section>
      </main>
    </>
  );
}
