import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://assets.entrepreneur.com/content/3x2/2000/20170731115918-business-concept-hand-hold-white-paper-house-and-money-bokeh-background-sv3m1o2fg.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold font-mono">Welcome to Our Loan Services</h1>
          <p className="mb-5">
            Get the financial support you need with our flexible loan options.
            Whether you're looking to buy a home, start a business, or consolidate
            debt, we've got you covered.
          </p>
          <div className="mb-5">
            <p className="text-lg">Why choose us:</p>
            <ul className="text-left list-inside list-disc">
              <li>Competitive interest rates</li>
              <li>Fast and easy application process</li>
              <li>Flexible repayment options</li>
              <li>Excellent customer support</li>
            </ul>
          </div>
          <button className="btn btn-primary"> <Link to={"loan-request"}>Request For Loan</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
