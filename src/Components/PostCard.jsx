import React from "react";
import { SlDislike, SlLike } from "react-icons/sl";
import { GoComment } from "react-icons/go";
const PostCard = ({
    userInfo,
    recentPost
  
}) => {
  return (
    <div className=" space-y-2 mt-5">

    
   { recentPost.map(itme => (
        <div className=" w-full mx-auto border rounded-lg shadow-lg p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-sm capitalize text-blue-600 font-semibold">
              {itme.tag}
            </span>
            <h2 className="text-xl font-bold mt-1">{userInfo.Title}</h2>
          </div>
          <span className="text-sm text-gray-500">{new Date(itme.createdAt).toLocaleString()}</span>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-green-400 text-white flex justify-center items-center text-lg font-bold mr-3">
          <img  className='rounded-full' src={userInfo.photo} alt="" srcset="" />
          </div>
          <div>
            <p className="font-bold">{userInfo.name}</p>
            <p className="text-sm text-gray-500">{userInfo.email}</p>
          </div>
        </div>
        <p className="text-gray-800 mb-6">
          {itme.Description.toString(0, 150)}...
        </p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-3 text-gray-600">
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <SlLike />
  
              <span>{itme.UpVote}</span>
            </button>
            
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <SlDislike />
              <span>{itme.DownVote}</span>
            </button>
          </div>
          
        </div>
      </div>
    ))}
   </div>
  );
};

export default PostCard;
