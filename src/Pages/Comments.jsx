import { useContext, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import SecureAxios from "../Hook/SecureAxios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,

} from "keep-react";
import { Select } from '@headlessui/react'
import UserContext from "../Context/AuthContext";
import DataNotFound from "../Components/DataNotFound";

function Comments() {

  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [reportedComments, setReportedComments] = useState({});
  const [modalContent, setModalContent] = useState("");
  const {user} = useContext(UserContext)

  const { postId } = useParams();
  const { data: comments = [] } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await SecureAxios.get(`/getComments/${postId}`);
      return res.data;
    },
  });

  const handleFeedback = (commentId, feedback) => {
    setSelectedFeedback((prev) => ({
      ...prev,
      [commentId]: feedback,
    }));
  };

   const handleReport = async (commentId, email) => {
    const feedback = selectedFeedback[commentId];
     if(user?.email === email) return toast.warning(" you can't report yourself")
   
    const reportData = {
      commentId,
      commenter: email,
      feedback,
      repoter: user?.email,
    };

    try {
      // Send report data to the backend API
      const response = await SecureAxios.post(`/comments_report`, reportData)
      console.log(response)
      if (response.status === 200) {
        toast.success("Report submitted successfully!");
        setReportedComments((prev) => ({
          ...prev,
          [commentId]: true,
        }));
      } else {
        toast.error("Failed to submit the report. Try again.");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("An error occurred while submitting the report.");
    }
  };

  const handleReadMore = (text) => {
    setModalContent(text);
    document.getElementById('my_modal_2').showModal()
  };

  return (
    <div>
   
      <h2 className="text-3xl font-bold text-center my-5">Review comment </h2>
       {
        comments.length <= 0 ? <DataNotFound title={"No comments Available"} description={
          "No comments available yet. Be the first to comment on this post."
        } /> :
       
      <Table className="w-11/12 mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="max-w-[250px]"> commenter email </div>
            </TableHead>
            <TableHead>
              <div className="w-[80px]">comment</div>
            </TableHead>
            <TableHead>
              <div className="w-[85px]">feedback</div>
            </TableHead>
            <TableHead>
              <div className="w-[90px]">Report </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comments.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <div className="max-w-[250px] truncate">{item.commenter}</div>
              </TableCell>
              <TableCell>
                {item.comment.length > 20 ? (
                  <>
                    {item.comment.substring(0, 20)}...
                    <button
                      onClick={() => handleReadMore(item.comment)}
                      className="text-blue-500 px-1"
                    >
                      Read More
                    </button>
                  </>
                ) : (
                  <>{item.comment}</>
                )}
              </TableCell>
              {/* dropdown  */}
              <TableCell>
                
                <Select
                onChange={(e) => handleFeedback(item._id, e.target.value)}
                 className='bg-orange-100 text-orange-500 p-2 rounded-md'
                name="status" aria-label="Project status">
                  <option  value="">Select feedback</option>
                  <option value="Spam">Spam</option>
                  <option value="False information">False information</option>
                  <option value="Inappropriate">Inappropriate</option>
                
                </Select>
              </TableCell>

              {/* button*/}
              <TableCell>
                <Button
                  className="bg-rose-100 text-rose-500 font-semibold  "
                  disabled={
                    !selectedFeedback[item._id] || reportedComments[item._id]
                  }
                  onClick={() => handleReport(item._id,item.commenter)}
                >
                {reportedComments[item._id] ? "Reported" : "Report"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      }
      {/* modal  */}
      <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Full Comment</h3>
          <p className="py-4">{modalContent}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Comments;
