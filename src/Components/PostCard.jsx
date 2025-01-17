import React from "react";
import { SlDislike, SlLike } from "react-icons/sl";
import { GoComment } from "react-icons/go";
const PostCard = () => {
  return (
    <div className="max-w-xl mx-auto border rounded-lg shadow-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-sm text-red-600 font-semibold">
            Technical Support
          </span>
          <h2 className="text-xl font-bold mt-1">Problem with UI scale </h2>
        </div>
        <span className="text-sm text-gray-500">December 28, 2023</span>
      </div>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-green-400 text-white flex justify-center items-center text-lg font-bold mr-3">
          M
        </div>
        <div>
          <p className="font-bold">Mark4th</p>
          <p className="text-sm text-gray-500">mark4</p>
        </div>
      </div>
      <p className="text-gray-800 mb-6">
        I am trying to set my user interface to something that is actually...
      </p>
      <div className="flex justify-between items-center">
        <div className="flex space-x-3 text-gray-600">
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <SlLike />

            <span>0</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <GoComment />
            <span>0</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <SlDislike />
            <span>0</span>
          </button>
        </div>
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Read More
        </button> */}
      </div>
    </div>
  );
};

export default PostCard;
