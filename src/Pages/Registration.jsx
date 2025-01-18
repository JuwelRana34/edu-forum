import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaArrowsSpin } from "react-icons/fa6";
import axios from "axios";
import useAxiosPublic from "../Hook/useAxiosPublic";

function Registration() {
  const { Registration, GoogleLogin, UpdateProfile, setIsloading } = useContext(UserContext);
  const navigate = useNavigate();
  const AxiosPublic = useAxiosPublic();
  const [isvisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const image = watch("image");

  const handleRegistration = async (data) => {
    setLoading(true);
    const { name, email, password, image } = data;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setLoading(false);
      return toast.error(
        "Password should be at least 6 characters long and contain at least one uppercase letter and one lowercase letter."
      );
    }

    if (!image[0]) {
      setLoading(false);
      return toast.error("Please select an image.");
    }

    try {
      // Register the user
      await Registration(email, password);

      // Upload the image
      const formData = new FormData();
      formData.append("image", image[0]);

      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: "5e43c78c1966794e70a2bd32d9366ea6", // Replace with your ImgBB API key
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        const imageUrl = response.data.data.url;

        // Update the user's profile
        await UpdateProfile(name, imageUrl);

        const userinfo = { name, photo: imageUrl, email };
        await AxiosPublic.post("/user", userinfo);

        toast.success("Registered successfully");
        reset();
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
    setIsVisible((prev) => !prev);
  };

  const googleRegistration = () => {
    GoogleLogin()
      .then(({ user }) => {
        const userinfo = {
          name: user.displayName,
          photo: user.photoURL,
          email: user.email,
        };

        AxiosPublic.post("/user", userinfo)
          .then(() => {
            toast.success("Login successful");
            setIsloading(false);
            navigate("/");
          })
          .catch((err) => {
            toast.error("An error occurred while creating user.");
            console.error(err);
          });
      })
      .catch((err) => {
        toast.error(`${err}`);
        setIsloading(false);
      });
  };

  return (
    <div>
      <div className="border my-10 rounded-lg md:w-1/2 mx-auto p-4">
        <h1 className="text-center my-5 capitalize font-bold text-2xl">Registration</h1>
        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your name"
              {...register("name", { required: "Name is required" })}
              className="grow"
            />
          </label>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="file"
              {...register("image", { required: "Please upload an image" })}
              className="grow"
            />
          </label>
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="grow"
            />
          </label>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <label className="input input-bordered flex items-center gap-2">
            <input
              type={isvisible ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="grow"
            />
            <div onClick={handelPassIcon}>
              {isvisible ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </label>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <p className="capitalize font-semibold">
            Have an account?{" "}
            <Link to="/JoinUs" className="text-blue-500">
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-600 dark:hover:bg-metal-700 dark:bg-metal-800 text-white w-full"
          >
            {loading ? ( <>
             <span className=" animate-pulse">loading..   </span>
             <span className="text-white animate-spin">
               <FaArrowsSpin className="text-xl" />
              </span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="divider">OR</div>
        <div className="w-full flex justify-center">
          <button
            className="border text-md font-semibold text-gray-600 capitalize flex items-center gap-3 rounded-lg my-5 py-2 px-3 dark:text-metal-300"
            onClick={googleRegistration}
          >
            <img
              className="w-7"
              src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
              alt="Google Icon"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
