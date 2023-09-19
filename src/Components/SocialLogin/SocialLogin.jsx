import React, { useContext } from "react";
import { FaGofore } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider";
import useToast from "../../Hooks/useToast";

const SocialLogin = () => {
  const { googleSingin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [successAlert, errorAlert] = useToast();
  const from = location.state?.from?.pathname || "/";
  const handlegoogleSingin = () => {
    googleSingin()
      .then((result) => {
        const loggedInUser = result.user;
        const saveUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
          phoneNumber: "",
          role: "user",
          image: loggedInUser.photoURL,
        };
        console.log(loggedInUser);
        axios.post("http://localhost:5000/users/user", saveUser).then((result) => {
          navigate(from, { replace: true });
          // successAlert("account create successfull");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        errorAlert(errorMessage);
      });
  };
  return (
    <div>
      <div className="divider">OR</div>
      <button
        onClick={() => handlegoogleSingin()}
        className="btn btn-active btn-ghost w-full"
      >
        <FaGofore size={26} /> sign in with google
      </button>
    </div>
  );
};

export default SocialLogin;
