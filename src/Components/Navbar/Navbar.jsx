import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useToast from "../../Hooks/useToast";
import useAdmin from "../../Hooks/useAdmin";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [successAlert] = useToast();
  //  logout user
  const handleLogout = () => {
    logOut().then(() => {
      successAlert("logout successfull");
    });
  };

  const [isAdmin] = useAdmin();
  return (
    <div className="navbar bg-slate-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/loan-request">Loan Request</Link>
            </li>
            <li>
              <Link to="/my-loans">My Loans</Link>
            </li>
            {isAdmin && (
              <li>
                <Link to={"/admin-dashboard/manage-loans"}>Admin</Link>
              </li>
            )}

            {!user && (
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">EASY-LOAN</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[18px]">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/loan-request">Loan Request</Link>
          </li>
          <li>
            <Link to="/my-loans">My Loans</Link>
          </li>
          {isAdmin && (
            <li>
              <Link to={"/admin-dashboard/manage-loans"}>Admin</Link>
            </li>
          )}

          {!user && (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {user && (
          <div className="flex justify-center items-center">
            <img
              className="w-10 h-10 rounded-full mx-6"
              src={user.photoURL}
              alt=""
            />
            <button onClick={() => handleLogout()} className="btn btn-info">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
