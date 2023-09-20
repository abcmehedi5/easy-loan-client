import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { AuthContext } from "../Providers/AuthProvider";

const Main = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user && <Navbar></Navbar>}
      <Outlet></Outlet>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Main;
