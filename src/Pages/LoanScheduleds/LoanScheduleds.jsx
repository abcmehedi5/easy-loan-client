import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useToast from "../../Hooks/useToast";
import LazyLoader from "../../Components/LazyLoader/LazyLoader";

const LoanScheduleds = () => {
  const [repayment, setRepayment] = useState("");
  const [loading, setLoading] = useState(false);
  const [successAlert, errorAlert] = useToast();
  const { id } = useParams();
  const {
    data: loan = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["loan"],
    queryFn: async () => {
      const res = await axios.get(
        "https://easy-loan-server-abcmehedi5.vercel.app/loans/loan-scheduled/" + id
      );
      return res.data;
    },
  });

  //  loading check
  if (isLoading) {
    return <LazyLoader></LazyLoader>;
  }

  //  handle repayment
  const handleRepayment = async () => {
    setLoading(true);
    if (repayment >= todayLoan.toFixed(2)) {
      try {
        const res = await axios.patch(
          "https://easy-loan-server-abcmehedi5.vercel.app/loans/repayment/" + loan._id,
          { loanAmount: repayment }
        );
        const result = await res.data;
        setLoading(false);
        successAlert(result.message);
        refetch();
      } catch (error) {
        setLoading(false);
        errorAlert("payment couldn't submit. please try again");
      }
    } else {
      errorAlert("please valid amount in input filed");
      setLoading(false);
    }
  };
  //   diveded amount
  const dividedLoan = loan.dividedLoan;
  const todayLoan = loan.loanAmount / dividedLoan;

  //  date calculation -------------------------------------------start
  const paymentDate = loan.date; //2023-09-19T15:35:02.276Z
  //   check paid payment
  const paid = dividedLoan == 0;
  const isFirstPaid = dividedLoan == 1;
  const isSecondPaid = dividedLoan == 2;
  const isThirdPaid = dividedLoan == 3;
  console.log(isFirstPaid, isSecondPaid, isThirdPaid);
  // Convert paymentDate to a JavaScript Date object
  const paymentDateObject = new Date(paymentDate);
  // Calculate the date 7 days after paymentDate
  const sevenDaysLater = new Date(paymentDateObject);
  sevenDaysLater.setDate(paymentDateObject.getDate());
  // Calculate the date 14 days after paymentDate
  const fourteenDaysLater = new Date(paymentDateObject);
  fourteenDaysLater.setDate(paymentDateObject.getDate() + 14);

  // Calculate the date 21 days after paymentDate
  const twentyoneDaysLater = new Date(paymentDateObject);
  twentyoneDaysLater.setDate(paymentDateObject.getDate() + 21);

  const todayDate = new Date();
  const isDaySeven = sevenDaysLater <= todayDate;
  const isFourteenDaysLater = fourteenDaysLater <= todayDate;
  const istwentyoneDaysLater = twentyoneDaysLater <= todayDate;

  //  date calculation -------------------------------------------end

  return (
    <div>
      <h1 className="text-center mt-4 mb-4 uppercase text-2xl font-bold">
        repayment schedule
      </h1>
      <hr />
      {!paid && (
        <div className=" shadow-xl grid md:grid-cols-3 grid-cols-1 gap-7 m-4">
          {/* first week payment */}
          <div
            className={` ${
              isThirdPaid && isDaySeven
                ? "bg-green-200 border-green-400"
                : "bg-red-100 border-red-200"
            } card-body border rounded-md relative`}
          >
            <h1
              className={`${
                isThirdPaid == false
                  ? "stroke-green-600 bg-green-200"
                  : " bg-red-300"
              } text-white w-36 text-center p-2 rounded-sm absolute top-2 right-2`}
            >
              {isThirdPaid == false ? "Paid" : "Unpaid"}
            </h1>
            <p>{loan.name}</p>
            <p>{loan.email}</p>
            <h5 className="mt-3">
              Payment date : {sevenDaysLater.toLocaleDateString("en-GB")}
            </h5>
            <p className="mt-3">Amount: {todayLoan.toFixed(2)} $</p>
            <div className="card-actions justify-end">
              <button
                disabled={!isThirdPaid || !isDaySeven}
                className="btn btn-info text-gray-500"
              >
                <a href="#my_modal_8">Repayment</a>
              </button>
            </div>
          </div>

          {/* second week payment */}
          <div
            className={` ${
              isSecondPaid && isFourteenDaysLater
                ? "bg-green-200 border-green-400"
                : "bg-red-100 border-red-200"
            } card-body border rounded-md relative`}
          >
            <h1
              className={`${
                isFirstPaid ? "stroke-green-600 bg-green-200" : "  bg-red-300"
              } text-white w-36 text-center p-2 rounded-sm absolute top-2 right-2`}
            >
              {isFirstPaid ? "Paid" : "Unpaid"}
            </h1>
            <p>{loan.name}</p>
            <p>{loan.email}</p>
            <h5 className="mt-3">
              Payment date : {fourteenDaysLater.toLocaleDateString("en-GB")}
            </h5>
            <p className="mt-3">Amount: {todayLoan.toFixed(2)} $</p>
            <div className="card-actions justify-end">
              <button
                disabled={!isSecondPaid || !isFourteenDaysLater}
                className="btn btn-info text-gray-500"
              >
                <a href="#my_modal_8">Repayment</a>
              </button>
            </div>
          </div>
          {/* third week payment */}
          <div
            className={` ${
              isFirstPaid && istwentyoneDaysLater
                ? "bg-green-200 border-green-400"
                : "bg-red-100 border-red-200"
            } card-body border rounded-md relative`}
          >
            <h1
              className={`${
                isSecondPaid && !isSecondPaid
                  ? "stroke-green-600 bg-green-200"
                  : " bg-red-300"
              } text-white w-36 text-center p-2 rounded-sm absolute top-2 right-2`}
            >
              {isSecondPaid && !isSecondPaid ? "Paid" : "Unpaid"}
            </h1>
            <p>{loan.name}</p>
            <p>{loan.email}</p>
            <h5 className="mt-3">
              Payment date : {twentyoneDaysLater.toLocaleDateString("en-GB")}
            </h5>
            <p className="mt-3">Amount: {todayLoan.toFixed(2)} $</p>
            <div className="card-actions justify-end">
              <button
                disabled={!isFirstPaid || !istwentyoneDaysLater}
                className="btn btn-info text-gray-500"
              >
                <a href="#my_modal_8">Repayment</a>
              </button>
            </div>
          </div>
        </div>
      )}

      {paid && (
        <div className="card-body border h-screen flex items-center justify-center  ">
          <h1 className="text-center  text-3xl font-bold text-red-600  ">
            Your loan is paid !
          </h1>
        </div>
      )}

      {/* repayment modal */}

      <div>
        <div className="modal" id="my_modal_8">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-5">
              Total amount: {todayLoan.toFixed(2)} $
            </h3>
            <form>
              <input
                type="number"
                placeholder="Amount here"
                // defaultValue={todayLoan.toFixed(2)}
                onChange={(e) => setRepayment(e.target.value)}
                className="input input-bordered  w-full "
              />
            </form>
            <div className="modal-action">
              <button
                onClick={() => handleRepayment()}
                className="btn btn-info"
              >
                Submit
                {loading && (
                  <span className="loading loading-spinner loading-md"></span>
                )}
              </button>
              <a href="#" className="btn">
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanScheduleds;
