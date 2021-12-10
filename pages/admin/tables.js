import React, {useState, useEffect} from "react";
import CardTable from "components/Cards/CardTable.js";
import Admin from "layouts/Admin.js";

import UsersTable from "components/Cards/usersTable";


export default function Tables() { 



  return (
    <>
      
      <UsersTable/>
     
    </>
  );
}

Tables.layout = Admin;
