import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://www.forbes.com/advisor/wp-content/uploads/2021/02/960x0_29.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold">WELCOME TO EASY LOAN</h1>
          <p className="mb-5">
            Your Path to Financial Success Begins Here. Explore Our Loan
            Solutions Today and Take Control of Your Future. Join Us in Building
            Your Financial Freedom.
          </p>

          <Link className="btn btn-info" to={"/loan-request"}>
            request for loan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
