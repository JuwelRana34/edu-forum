import { useContext } from "react";
import UserContext from "../Context/AuthContext";
import { Button, InputIcon, Input, Label, Divider, toast } from "keep-react";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import useAxiosPublic from "../Hook/useAxiosPublic";

function JoinUs() {
  const { GoogleLogin, login } = useContext(UserContext);
  const navigate = useNavigate();
  const  AxiosPublic = useAxiosPublic()

  const Login = (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    login(email.value, password.value)
      .then(() => {
        toast.success("Logged in successfully");
        navigate("/");
        e.target.reset();
      })
      .catch((err) => toast.error(`${err.message}`));
  };

  const handleGoogleLogin = () => {
    GoogleLogin()
      .then(({user}) => {
        toast.success("Logged in successfully");
      const userinfo={
          name: user.displayName,
          photo: user.photoURL,
          email: user.email
        }

        AxiosPublic.post('/user', userinfo)
        .then(() =>{
         
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
        <form onSubmit={Login} className="space-y-4">
          <h1 className=" text-center font-bold text-3xl  ">Login</h1>
          <fieldset className="space-y-1">
            <Label htmlFor="name">Email</Label>
            <div className="relative">
              <Input name="email" placeholder="Enter email" className="ps-11" />
              <InputIcon>
                <FaEnvelope size={19} color="#AFBACA" />
              </InputIcon>
            </div>
          </fieldset>
          <fieldset className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                name="passowrd"
                id="password"
                placeholder="Enter password"
                type="password"
                className="ps-11"
              />
              <InputIcon>
                <FaLock size={19} color="#AFBACA" />
              </InputIcon>
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
