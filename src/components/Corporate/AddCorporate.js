import React from "react";
import CorporateForm from "./CorporateForm";
import { useLocation } from "react-router-dom";

const AddCorporate = () => {
  let location = useLocation();
  const id = location.state;
  // console.log(id);
  return <CorporateForm type="admin" id={id} />;
};
export default AddCorporate;
