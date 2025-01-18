import { useLocation, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import SecureAxios from '../Hook/SecureAxios'
import { SlDislike, SlLike } from 'react-icons/sl'
import {
  
    FacebookIcon,
    FacebookShareButton,
    FacebookShareCount,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
   
  } from "react-share";
import { BiComment } from 'react-icons/bi';
import { useContext } from 'react';
import UserContext from '../Context/AuthContext';
import {toast} from 'keep-react'
function PostDetails() {
    const {id} = useParams()
    const {user} = useContext(UserContext)
    const {data:postinfo = {}}= useQuery({
        queryKey: ['postinfo', id],
        queryFn: async () => {
            const response = await SecureAxios.get(`/postDetails/${id}`)
            return response.data
        }
    })
    console.log(postinfo)
   const handelComment =(e)=>{
   e.preventDefault()
    const {comment} = e.target
      SecureAxios.post('/comment',{
        comment: comment.value,
        postId:postinfo._id,
        commenter: user?.email,
        createdAt: new Date()
      })
      .then(()=>{
        toast.success('comment added successfully')
        e.target.reset()
        
      })
      .catch((err)=>toast.error(err.message))
    }

    const shareUrl = `${window.location.origin}/post/${id}`;
  return (
    <>
      <div className="h-screen">
        <div className=" w-[95%] md:w-10/12 mt-10  flex-col items-center justify-center mx-auto border rounded-lg shadow-lg p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-400 text-white flex justify-center items-center text-lg font-bold mr-3">
                  <img
                    className="rounded-full"
                    src={postinfo.Author_Image}
                    alt=""
                    srcset=""
                  />
                </div>
                <div>
                  <p className="font-bold">{postinfo.Author_Name}</p>
                  <p className="text-sm text-gray-500">
                    {postinfo.Author_Email}
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-1">
                {postinfo.Title}
                <span className="text-sm ml-2 capitalize text-blue-600 font-semibold">
                  #{postinfo.tag}
                </span>
              </h2>
            </div>
          </div>

          <p className="text-gray-800 text-justify mb-6">
            {postinfo.Description}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex space-x-3 text-gray-600">
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <SlLike />

                <span>{postinfo.UpVote}</span>
              </button>

              <button className="flex items-center space-x-1 hover:text-blue-600">
                <SlDislike />
                <span>{postinfo.DownVote}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <BiComment />
                <span>{0}</span>
              </button>

              <FacebookShareButton
                url={shareUrl}
                quote={`${postinfo.Title} - Check out this amazing post!`}
                hashtag={`${postinfo.Title}`}
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(postinfo.createdAt).toLocaleTimeString()}
            </span>
          </div>

          {/* comments  */}
          <h1 className='h2'>comment:</h1>
          <form onSubmit={handelComment} className='flex gap-2 mt-5'>
            <span>
                <img src={user?.photoURL} className='w-8  h-8 ring-2 ring-metal-200 shadow  rounded-full' alt="" />
            </span>
            <div className='mt-1'>
                <textarea name="comment" placeholder='type your comment...' className='border p-2 rounded' id=""></textarea> <br />
                <input className='button cursor-pointer' type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostDetails