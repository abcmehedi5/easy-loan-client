import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import LazyLoader from "../../Components/LazyLoader/LazyLoader";
import useToast from "../../Hooks/useToast";
import NoDataError from "../../Components/NoDataError/NoDataError";

const MyLoans = () => {
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
      const res = await axios.get(
        `http://localhost:5000/loans/loan?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <LazyLoader></LazyLoader>;
  }

  if (isError) {
    return errorAlert("loan not found");
  }
  return (
    <div className="container mx-auto mb-24">
      {loans.length == 0 ? (
        <NoDataError />
      ) : (
        <div className="overflow-x-auto">
          <h1 className="text-center text-2xl font-bold mt-4 mb-4 uppercase">
            My Loans
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
                <th>Loan Scheduled </th>
                <th>Status</th>
              </tr>
            </thead>

            {loans.map((loan, index) => (
              <tbody key={index}>
                <tr className="bg-slate-200">
                  <th>{index + 1}</th>
                  <td>Mehedi hassan</td>
                  <td>
                    {loan.loanAmount.toFixed(2) <= 0
                      ? 0
                      : loan.loanAmount.toFixed(2)}
                  </td>
                  <td>{loan.date}</td>
                  <td>{loan.email}</td>
                  <td>
                    <button
                      disabled={loan.status == "pending"}
                      className="btn btn-secondary"
                    >
                      <Link to={"/scheduled/" + loan._id}>check scheduled</Link>
                    </button>
                  </td>
                  <td
                    className={`font-bold  ${
                      loan.status == "pending"
                        ? "bg-red-300  border-red-600 "
                        : "bg-green-200 "
                    }`}
                  >
                    {loan.status}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default MyLoans;
