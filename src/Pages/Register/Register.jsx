import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import useToast from "../../Hooks/useToast";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const { createUserEmail, updateUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [successAlert, errorAlert] = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // validate------------------
    // name validate
    if (!/(?=.*[a-z])/.test(data.name)) {
      errorAlert("Your name not valid");
      setLoading(false);
      return;
    }

    // password validate
    if (data.password !== data.confirmPassword) {
      errorAlert("Your password did not match");
      setLoading(false);
      return;
    } else if (data.password.length < 6) {
      errorAlert("password must be 6 characters or longer");
      setLoading(false);
      return;
    }

    if (!/(?=.*[A-Z])(?=.*[^A-Za-z0-9])/.test(data.password)) {
      errorAlert("don't have a capital letter and special character ");
      setLoading(false);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(
      `https://api.imgbb.com/1/upload?key=132b873aeba0a9d4de363955fe04a522`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const photoURL = result.data.display_url;
          const email = data.email;
          const password = data.password;
          const name = data.name;
          createUserEmail(email, password)
            .then((result) => {
              const user = result.user;
              updateProfile(user, name, photoURL);

              // send data mongodb data base start
              const saveUser = {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber,
                image: photoURL,
                role: "user",
              };
              axios.post("http://localhost:5000/users/user", saveUser).then((result) => {
                successAlert("account create successfull");
                navigate("/");
                setLoading(false);
              });
              // send data mongodb data base start
            })
            .catch((error) => {
              successAlert(error.message);
              setLoading(false);
            });
        }
      });
  };

  const updateProfile = (user, name, photoURL) => {
    updateUserProfile(user, {
      displayName: name,
      photoURL: photoURL,
    })
      .then((result) => {})
      .catch((error) => {
        successAlert(error.message);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <label
            htmlFor="image"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Your Profile Photo
          </label>
          <input
            type="file"
            id="image"
            {...register("image", { required: true })}
            className="file-input file-input-bordered file-input-md w-full  mb-10"
          />
          <button
            type="submit"
            className="w-full flex items-center gap-2 justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            {loading && (
              <span className="loading loading-spinner loading-md"></span>
            )}{" "}
            Register
          </button>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
