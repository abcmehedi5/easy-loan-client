import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import LoanRequest from "../Pages/LoanRequest/LoanRequest";
import MyLoans from "../Pages/MyLoans/MyLoans";
import LoanScheduleds from "../Pages/LoanScheduleds/LoanScheduleds";

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
      {
        path: "/scheduled/:id",
        element: <LoanScheduleds></LoanScheduleds>,
      },
    ],
  },
]);

export default router;
