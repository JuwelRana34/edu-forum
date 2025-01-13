import React from "react";
import { useContext, useState } from "react";
import UserContext from "../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaArrowsSpin } from "react-icons/fa6";
import axios from "axios";
function Registration() {
  const { Registration, GoogleLogin, UpdateProfile, setIsloading } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [isvisible, setIsVisible] = useState(false);
  const [loading , setLoading] = useState(false)
  const [image, setImage] = useState(null)

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password } = e.target;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!passwordRegex.test(password.value)) {
      setLoading(false);
      return toast.error(
        "Password should be at least 6 characters long and contain at least one uppercase letter and one lowercase letter."
      );
    }

    if (!image) {
      setLoading(false);
      return toast.error("Please select an image.");
    }

    try {
      // Register the user first
      await Registration(email.value, password.value);

      // Upload the image
      const formData = new FormData();
      formData.append("image", image); // Append the selected image to the form data

      const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
        params: {
          key: "5e43c78c1966794e70a2bd32d9366ea6", // Replace with your ImgBB API key
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        const imageUrl = response.data.data.url;
        console.log("Image uploaded successfully:", imageUrl);
        // Update the user's profile with the uploaded image
        await UpdateProfile(name.value, imageUrl);
        toast.success("Registered successfully");
        e.target.reset();
        navigate("/");
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      toast.error("Error during registration or image upload.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handelPassIcon = () => {
    setIsVisible((icon) => !icon);
  };

  const googleRegistration = () => {
    GoogleLogin()
      .then(() => {
        toast.success("login successful");
        setIsloading(false);
        navigate("/");
      })
      .catch((err) => {
        toast.error(`${err}`);
        setIsloading(false);
      });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div>
      <div className="border my-10 rounded-lg md:w-1/2 mx-auto p-4">
        <h1 className="text-center my-5 capitalize font-bold text-2xl">
          registration{" "}
        </h1>
        <form onSubmit={handleRegistration} className=" space-y-4">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              required
              name="name"
              className="grow"
              placeholder="Type your name"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="file"
              required
              name="PhotoUrl"
              className="grow"
             onChange={handleImageChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              required
              className="grow"
              placeholder="Email"
              name="email"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={isvisible ? "text" : "password"}
              className="grow"
              name="password"
              placeholder="Password"
            />
            <div onClick={handelPassIcon}>
              {isvisible ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </label>

          <p className=" capitalize font-semibold">
            have you account?{" "}
            <Link to="/login" className="text-blue-500 ">
              Login
            </Link>
          </p>

          <button className="btn  bg-blue-500 hover:bg-blue-600 dark:hover:bg-metal-700 dark:bg-metal-800 text-white w-full">
            {loading? (
              <span className="text-white animate-spin"><FaArrowsSpin className="text-xl" /></span>
            ) : (
              "Register"
            )}
           
          </button>
        </form>
        <div className="divider">OR</div>

        <div className=" w-full  flex justify-center">
          <button
            className="border text-md font-semibold text-gray-600 capitalize flex  items-center gap-3 rounded-lg my-5 py-2 px-3 dark:text-metal-300"
            onClick={googleRegistration}
          >
            <img
              className="w-7 "
              src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
              alt=""
            />
            continue with google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
