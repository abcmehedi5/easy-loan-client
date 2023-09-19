import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const LoanScheduleds = () => {
  const [repayment, setRepayment] = useState("");

  const { id } = useParams();
  const {
    data: loan = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["loan"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:5000/loans/loan-scheduled/" + id
      );
      return res.data;
    },
  });
  //  handle repayment
  const handleRepayment = async () => {
    if (repayment >= todayLoan.toFixed(2)) {
      try {
        const res = await axios.patch(
          "http://localhost:5000/loans/repayment/" + loan._id,
          { loanAmount: repayment }
        );
        const result = await res.data;
        alert(result.message);
        refetch();
      } catch (error) {
        alert("payment worng");
      }
    } else {
      alert("please valid amount in input filed");
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

  // Convert paymentDate to a JavaScript Date object
  const paymentDateObject = new Date(paymentDate);
  // Calculate the date 7 days after paymentDate
  const sevenDaysLater = new Date(paymentDateObject);
  sevenDaysLater.setDate(paymentDateObject.getDate()+7);

  // Calculate the date 14 days after paymentDate
  const fourteenDaysLater = new Date(paymentDateObject);
  fourteenDaysLater.setDate(paymentDateObject.getDate() + 14);

  // Calculate the date 21 days after paymentDate
  const twentyoneDaysLater = new Date(paymentDateObject);
  twentyoneDaysLater.setDate(paymentDateObject.getDate() + 21);

  // check date in today

  // current date
  const todayDate = new Date();
  const todayFormateDate = todayDate.toLocaleDateString("en-GB");

  const isDaySeven =
    sevenDaysLater.toLocaleDateString("en-GB") == todayFormateDate;
  const isFourteenDaysLater =
    fourteenDaysLater.toLocaleDateString("en-GB") == todayFormateDate;
  const istwentyoneDaysLater =
    twentyoneDaysLater.toLocaleDateString("en-GB") == todayFormateDate;
  console.log(isDaySeven);
  //  date calculation -------------------------------------------end

  console.log(isDaySeven);

  return (
    <div>
      {!paid && (
        <div className=" shadow-xl grid grid-cols-3 gap-7 m-4">
          {/* first week payment */}
          <div
            className={` ${
              isThirdPaid && isDaySeven ? "opacity-100" : "opacity-50"
            } card-body border bg-stone-300`}
          >
            <p>Md.Mehedi Hassan</p>
            <h1 className="stroke-orange-600 bg-orange-600 w-36 text-center p-2 rounded-sm">{!isThirdPaid ? "Paid" : "Unpaid"}</h1>
            <p>{todayLoan.toFixed(2)} $</p>
            <p>{loan.email}</p>
            <div className="card-actions justify-end">
              <button
                disabled={!isThirdPaid || !isDaySeven}
                className="btn btn-primary"
              >
                <a href="#my_modal_8">Repayment</a>
              </button>
            </div>
          </div>

          {/* second week payment */}
          <div
            className={` ${
              isSecondPaid && isFourteenDaysLater ? "opacity-100" : "opacity-50"
            } card-body border bg-stone-300`}
          >
            <p>Md.Mehedi Hassan</p>
            <p>{todayLoan.toFixed(2)} $</p>
            <p>{loan.email}</p>
            <div className="card-actions justify-end">
              <button
                disabled={!isSecondPaid || !isFourteenDaysLater}
                className="btn btn-primary"
              >
                <a href="#my_modal_8">Repayment</a>
              </button>
            </div>
          </div>

          {/* third week payment */}
          <div
            className={` ${
              isFirstPaid && istwentyoneDaysLater ? "opacity-100" : "opacity-50"
            } card-body border bg-stone-300`}
          >
            <p>Md.Mehedi Hassan</p>
            <p>{todayLoan.toFixed(2)} $</p>
            <p>{loan.email}</p>
            <div className="card-actions justify-end">
              <button
                disabled={!isFirstPaid || !istwentyoneDaysLater}
                className="btn btn-primary"
              >
                <a href="#my_modal_8">Repayment</a>
              </button>
            </div>
          </div>
        </div>
      )}

      {paid && (
        <div className="card-body border bg-stone-300">
          <h1 className="text-center">Your loan is paid </h1>
        </div>
      )}

      {/* repayment modal */}

      <div>
        <div className="modal" id="my_modal_8">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{todayLoan.toFixed(2)} $</h3>
            <form>
              <input
                type="text"
                placeholder="Amount here"
                defaultValue={todayLoan.toFixed(2)}
                onChange={(e) => setRepayment(e.target.value)}
                className="input input-bordered  w-full "
              />
            </form>
            <div className="modal-action">
              <button
                onClick={() => handleRepayment()}
                className="btn btn-secondary"
              >
                Submit
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
