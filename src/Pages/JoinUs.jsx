import { useContext } from "react";
import UserContext from "../Context/AuthContext";
import { Button, InputIcon, Input, Label, Divider, toast } from "keep-react";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import useAxiosPublic from "../Hook/useAxiosPublic";

import { useForm } from "react-hook-form";

function JoinUs() {
  const { GoogleLogin, login } = useContext(UserContext);
  const navigate = useNavigate();
  const  AxiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = ({ email, password }) => {
    login(email, password)
      .then(() => {
        toast.success("Logged in successfully");
        navigate("/");
        reset();
      })
      .catch((err) => toast.error(`${err.message}`));
  };

  const handleGoogleLogin = () => {
    GoogleLogin()
      .then(({user}) => {
       
      const userinfo={
          name: user.displayName,
          photo: user.photoURL,
          email: user.email
        }

        AxiosPublic.post('/user', userinfo)
        .then(() =>{
          toast.success("Logged in successfully");
            navigate("/")
        }).catch((err) => {
            toast.error("An error occurred while creating user.")
            console.error(err)
          })
      
        
        
      })
      .catch((err) => toast.error(`${err.message}`));
  };

  return (
    <div>
      <div className="max-w-md mx-auto my-10 space-y-2 rounded-lg border  dark:border-none p-8 shadow-md  dark:bg-metal-800 ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="text-center font-bold text-3xl">Login</h1>

          <fieldset className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter email"
                className="ps-11"
              />
              <InputIcon>
                <FaEnvelope size={19} color="#AFBACA" />
              </InputIcon>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </fieldset>

          <fieldset className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter password"
                type="password"
                className="ps-11"
              />
              <InputIcon>
                <FaLock size={19} color="#AFBACA" />
              </InputIcon>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
          </fieldset>

          <Link to={""} className="my-2 underline block text-blue-500">
            Forgot password?
          </Link>

          <Button
            size="sm"
            className="dark:bg-metal-900 cursor-pointer bg-gray-900 px-5 my-2"
            type="submit"
          >
            Login
          </Button>
        </form>
        <Divider variant="center">OR</Divider>
        <div className="text-center">
          <Button
            onClick={handleGoogleLogin}
            className=" hover:bg-slate-50 dark:hover:bg-metal-700 space-x-2 mb-5 w-[80%] mx-auto border  text-gray-800 "
          >
            <img
              className="w-6"
              src="https://cdn-icons-png.flaticon.com/128/720/720255.png"
              alt=""
            />
            <h1 className="dark:text-metal-300">Login with Google </h1>
          </Button>
        </div>
        <p className="text-center">

        you haven't account? <Link to={'/registration'} className="text-blue-500 cursor-pointer">registration </Link> 
        </p>
      </div>
    </div>
  );
}

export default JoinUs;