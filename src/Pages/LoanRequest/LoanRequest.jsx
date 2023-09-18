import axios from "axios";
import { useForm } from "react-hook-form";
const LoanRequest = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const todayDate = new Date();
  const formattedDate = todayDate.toLocaleDateString("en-GB");

  const onSubmit = async (data) => {
    // create loan data object
    const loanRequest = {
      loanAmount: parseInt(data.loanAmount),
      data: formattedDate,
      email: "abcmehedi5@gmail.com",
      status: "pending",
    };

    // post loan data to server side
    try {
      const res = await axios.post(
        "http://localhost:5000/loans/loan",
        loanRequest
      );
      alert(res.data.message);
      reset(); // reset from
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg p-6 w-96 mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Loan Application
          </h2>
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
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Loan Request
          </button>
        </form>
      </div>
    </>
  );
};

export default LoanRequest;
