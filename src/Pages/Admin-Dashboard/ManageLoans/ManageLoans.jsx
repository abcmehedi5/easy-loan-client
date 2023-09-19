import React, { useContext, useRef, useState } from "react";
import LazyLoader from "../../../Components/LazyLoader/LazyLoader";
import { AuthContext } from "../../../Providers/AuthProvider";
import useToast from "../../../Hooks/useToast";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageLoans = () => {
  const { user } = useContext(AuthContext);
  const [successAlert, errorAlert] = useToast();

  const {
    data: loans = [],
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/loans/loan-all");
      return res.data;
    },
  });

  if (isLoading) {
    return <LazyLoader></LazyLoader>;
  }

  if (isError) {
    return errorAlert("loan not found");
  }

  // Define an event handler to update the status
  const handleStatusChange = async (newStatus, loanId) => {
    // Send a PUT or PATCH request to your API to update the status
    try {
      await axios.put(`http://localhost:5000/loans/loans-status/${loanId}`, {
        status: newStatus,
      });
      successAlert("Loan status updated successfully");
      refetch();
    } catch (error) {
      errorAlert("Failed to update loan status");
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <h1 className="text-center text-2xl font-bold mt-4 mb-4 uppercase">
          manage loans
        </h1>

        <table className="table rounded-lg shadow-lg text-center">
          {/* head */}
          <thead className="bg-slate-500 text-white text-[18px] ">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>

          {loans.map((loan, index) => (
            <tbody key={index}>
              <tr className="bg-slate-200">
                <th>{index + 1}</th>
                <td>{loan.name}</td>
                <td>
                  {loan.loanAmount.toFixed(2) <= 0
                    ? 0
                    : loan.loanAmount.toFixed(2)}{" "}
                  $
                </td>
                <td>{loan.date}</td>
                <td>{loan.email}</td>
                <td>
                  <select
                    className={`font-bold  select select-primary w-full max-w-xs ${
                      loan.status == "pending"
                        ? "bg-red-300  border-red-600 "
                        : "bg-green-200 "
                    }`}
                    defaultValue={loan.status}
                    onChange={(e) =>
                      handleStatusChange(e.target.value, loan._id)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                  </select>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ManageLoans;
