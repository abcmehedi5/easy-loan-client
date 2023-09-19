import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import LoanRequest from "../Pages/LoanRequest/LoanRequest";
import MyLoans from "../Pages/MyLoans/MyLoans";

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
        path: "/loan-request",
        element: <LoanRequest></LoanRequest>,
      },
      {
        path: "/my-loans",
        element: <MyLoans></MyLoans>,
      },
    ],
  },
]);

export default router;
