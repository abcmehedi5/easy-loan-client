import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const MyLoans = () => {
  const {
    data: loans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/loans/loan?email=abcmehedi5@gmail.com`
      );
      return res.data;
    },
  });
  console.log(loans);
  return (
    <div className="container mx-auto mb-24">
      <h1 className="text-center text-2xl font-bold mt-4 mb-4 uppercase">
        My Loans
      </h1>
      <div className="overflow-x-auto">
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
                <td>{loan.loanAmount}</td>
                <td>{loan.date}</td>
                <td>{loan.email}</td>
                <td>
                  <button
                    disabled={loan.status == "pending"}
                    className="btn btn-secondary"
                  >
                    check scheduled
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
    </div>
  );
};

export default MyLoans;
