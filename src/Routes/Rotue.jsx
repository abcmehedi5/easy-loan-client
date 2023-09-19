import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import LoanRequest from "../Pages/LoanRequest/LoanRequest";
import MyLoans from "../Pages/MyLoans/MyLoans";
import LoanScheduleds from "../Pages/LoanScheduleds/LoanScheduleds";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AdminDashboadLayout from "../Layouts/AdminDashboadLayout";
import ManageLoans from "../Pages/Admin-Dashboard/ManageLoans/ManageLoans";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/loan-request",
        element: <LoanRequest></LoanRequest>,
      },
      {
        path: "/my-loans",
        element: <MyLoans></MyLoans>,
      },
      {
        path: "/scheduled/:id",
        element: <LoanScheduleds></LoanScheduleds>,
      },
    ],
  },

  // admin route------------------

  {
    path: "admin-dashboard/manage-loans",
    element: <AdminDashboadLayout></AdminDashboadLayout>,
    children: [
      {
        path: "/admin-dashboard/manage-loans",
        element: <ManageLoans></ManageLoans>,
      },
    ],
  },
]);

export default router;
