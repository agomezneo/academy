import React, {useState, useEffect} from "react";
import Admin from "layouts/Admin.js";
import UsersTable from "../../components/Cards/UsersTable";

export default function Tables() { 
  return (
    <>
      <UsersTable/>
    </>
  );
}

Tables.layout = Admin;
