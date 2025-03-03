import React, { useContext } from "react";
import { FaComment } from "react-icons/fa";
import { SlDislike, SlLike } from "react-icons/sl";
import ThemeContext from "../Context/ThemeProvider";

const PostCard = ({
    userInfo,
    recentPost
  
}) => {

  const {theme} = useContext(ThemeContext)
  return (
    <div className=" space-y-2 mt-5">

    
   { recentPost.map(itme => (
        <div className={`${theme === "dark" && "bg-metal-700 border-none"} w-full mx-auto border rounded-lg shadow-lg p-4 `}>
        <div className="flex justify-between items-center mb-4">
          <div>
            
            <h2 className={` text-xl font-bold mt-1`}>{userInfo.Title}</h2>
          </div>
         
        </div>
        <div className="flex items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-green-400 text-white flex justify-center items-center text-lg font-bold mr-3">
          <img  className='rounded-full' src={userInfo.photo} alt="" srcset="" />
          </div>
          <div>
            <p className="font-bold">{userInfo.name}</p>
            <p className={` ${theme === "dark" && "text-metal-300 "} text-sm text-gray-500`}>{userInfo.email}</p>
            <span className={`${theme === "dark" && "text-metal-300 "} text-sm capitalize text-[#23a8fe] font-semibold`}>
              #{itme.tag}
            </span>
          </div>
        </div>
        <h2 className="text-2xl font-bold">
          {itme.Title}
        </h2>
        <p className={` ${theme === "dark"? "text-metal-300 ":"text-gray-800 "} mb-6`}>
          {itme.Description.substring(0,180) }...
        </p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-3 text-gray-600">
            <span className={` ${theme === "dark" && "text-metal-300 "} flex items-center space-x-1 hover:text-blue-600`}>
              <SlLike />
  
              <span>{itme.UpVote}</span>
            </span>
            
            <span className={`${theme === "dark" && "text-metal-300 "} flex items-center space-x-1 hover:text-blue-600`}>
              <SlDislike />
              <span>{itme.DownVote}</span>
            </span>
            <span className={`${theme === "dark" && "text-metal-300 "} flex items-center space-x-1 hover:text-blue-600`}>
              <FaComment />
              <span>{itme.comments.length}</span>
            </span>
          </div>
          <span className={` ${theme === "dark" && "text-metal-300 "} text-sm text-center text-gray-500`}>{new Date(itme.createdAt).toLocaleString()}</span>
        </div>
      </div>
    ))}
   </div>
  );
};

export default PostCard;
