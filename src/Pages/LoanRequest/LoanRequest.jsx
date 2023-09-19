import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import useToast from "../../Hooks/useToast";
const LoanRequest = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  const [successAlert, errorAlert] = useToast();
  const onSubmit = async (data) => {
    setLoading(true);
    // create loan data object
    const loanRequest = {
      loanAmount: parseInt(data.loanAmount),
      date: new Date(),
      email: user.email,
      name: user.displayName,
      status: "pending",
      dividedLoan: 3,
    };

    // post loan data to server side
    try {
      const res = await axios.post(
        "http://localhost:5000/loans/loan",
        loanRequest
      );
      successAlert(res.data.message);
      setLoading(false);
      reset(); // reset from
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-2xl border-2 rounded-lg p-6 w-2/4 mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Loan Application
          </h2>

          <div className="mb-4">
            <label htmlFor="loanAmount" className="block text-gray-700">
              Full Name
            </label>
            <input
              placeholder="Amount"
              value={user?.displayName}
              disabled
              id="loanAmount"
              type="text"
              className="w-full mt-4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="loanAmount" className="block text-gray-700">
              Email
            </label>
            <input
              placeholder="Amount"
              value={user?.email}
              disabled
              id="loanAmount"
              type="text"
              className="w-full mt-4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="loanAmount" className="block text-gray-700">
              Loan Amount
            </label>
            <input
              placeholder="Amount"
              {...register("loanAmount", { required: true })}
              id="loanAmount"
              type="number"
              className="w-full mt-4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.loanAmount && (
              <span className="text-red-500">Loan amount is required</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center gap-5 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            LOAN REQUEST{" "}
            {loading && (
              <span className="loading loading-spinner loading-md"></span>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default LoanRequest;
