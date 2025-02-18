import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import SecureAxios from "../Hook/SecureAxios";
import { SlDislike, SlLike } from "react-icons/sl";
import { FacebookIcon, FacebookShareButton } from "react-share";
import { BiComment } from "react-icons/bi";
import { useContext } from "react";
import UserContext from "../Context/AuthContext";
import { Button, toast } from "keep-react";
import Loading from "../Components/Loading";
function PostDetails() {
  const { id } = useParams();
  const { user ,isLoading:loader } = useContext(UserContext);
  const {
    data: postinfo = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["postinfo", id],
    queryFn: async () => {
      const response = await SecureAxios.get(`/postDetails/${id}`);
      return response.data;
    },
  });

  const handelComment = (e) => {
    e.preventDefault();
    if (!user) return toast.error(" you need to login to comment");
    const { comment } = e.target;
    SecureAxios.post("/comment", {
      comment: comment.value,
      postId: postinfo._id,
      commenter: user?.email,
      createdAt: new Date(),
    })
      .then(() => {
        toast.success("comment added successfully");
        e.target.reset();
        refetch();
      })
      .catch((err) => toast.error(err.message));
  };

  // Handle Like/Dislike
  const handleVotes = async (action) => {
    if (!user) {
      toast.error("You need to be logged in to Vote.");
      return;
    }

    const response = await SecureAxios.patch("/vote-upvote-downvote", {
      postId: postinfo._id,
      action,
      userEmail: user?.email,
    });

    if (response.status === 200) {
      refetch();
    } else {
      console.error("Failed to update like/dislike");
    }
  };

  const shareUrl = `${window.location.origin}/post/${id}`;
  
  if (loader) return <Loading />;

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="min-h-screen">
        <div className=" w-[98%] md:w-10/12 mt-10  flex-col items-center justify-center mx-auto border rounded-lg shadow-lg p-4 bg-white dark:bg-metal-800 dark:border-metal-700">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="flex items-start mb-4">
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
                  <p className="text-sm text-gray-500 dark:text-metal-300">
                    {postinfo.Author_Email}
                  </p>
                  <span className="text-sm  capitalize text-blue-400 font-semibold dark:text-metal-300">
                    #{postinfo.tag}
                  </span>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-1">{postinfo.Title}</h2>
            </div>
          </div>

          <p className="text-gray-800 dark:text-metal-300 text-justify mb-6">
            {postinfo.Description}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex space-x-3 text-gray-600">
              <button
                onClick={() => handleVotes("upvote")}
                className="flex items-center space-x-1 hover:text-blue-600 dark:text-metal-300"
              >
                <SlLike />

                <span>{postinfo.UpVote}</span>
              </button>

              <button
                onClick={() => handleVotes("downvote")}
                className="flex items-center space-x-1 hover:text-blue-600 dark:text-metal-300"
              >
                <SlDislike size={20} />
                <span>{postinfo.DownVote}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600 dark:text-metal-300">
                <BiComment size={20} />
                <span>{postinfo.comments.length}</span>
              </button>
              {user ? (
                <button className="px-1 ">
                  {" "}
                  <FacebookShareButton
                    url={shareUrl}
                    quote={`${postinfo.Title} `}
                    hashtag={`${postinfo.Title}`}
                  >
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>{" "}
                </button>
              ) : (
                <Button
                  onClick={() =>
                    toast.error("You need to be logged in to share this post.")
                  }
                >
                  <FacebookIcon className=" opacity-80" size={40} round />
                </Button>
              )}
            </div>
            <span className="text-sm text-center p-2 text-gray-500 dark:text-metal-300">
              {new Date(postinfo.createdAt).toLocaleString()}
            </span>
          </div>

          {/* comments  */}
          <h1 className="h2">comment:</h1>
          <form onSubmit={handelComment} className="flex gap-2 mt-5">
            <span>
              <img
                src={user?.photoURL}
                className="w-8  h-8 ring-2 ring-metal-200 shadow  rounded-full"
                alt=""
              />
            </span>
            <div className="mt-1">
              <textarea
                name="comment"
                placeholder="type your comment..."
                className="border dark:border-metal-700  p-2 rounded "
                id=""
              ></textarea>{" "}
              <br />
              <input className="button dark:text-metal-300 dark:bg-metal-900 cursor-pointer" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostDetails;
