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
import LoadingTable from "../Components/LoadingTable";
import DataNotFound from "../Components/DataNotFound";
import { useContext, useState } from "react";
import ThemeContext from "../Context/ThemeProvider";

function ReportedActivities() {
  const {theme}= useContext(ThemeContext)
  const [modalContent, setModalContent] = useState("");
  const {
    data: reportDatas = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reportedActivities"],
    queryFn: async () => {
      const res = await SecureAxios.get("/get-all-reports");
      return res.data;
    },
  });

  const handleDelete = async (reportId, commentId) => {
    try {
      await SecureAxios.delete(`/delete-comment/${reportId}/${commentId}`);
      refetch();
      toast.success("Comment deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete comment.");
    }
  };
  const handleReadMore = (text) => {
    setModalContent(text);
    document.getElementById("my_modal_1").showModal();
  };
  return (
    <div>
      <h2 className="text-3xl py-5 font-bold text-center">
        Reported Activities
      </h2>
      {isLoading ? (
        <LoadingTable />
      ) : (
        <>
          {reportDatas.length > 0 ? (
            <Table className={`button ${theme === "dark"? "bg-metal-800 text-metal-300":""}`}>
              <TableHeader  className={`button ${theme === "dark"? "bg-metal-800 text-metal-300":""}`} >
                <TableRow>
                  <TableHead  className={`button ${theme === "dark"? "bg-metal-800 text-metal-300":""}`}>
                    <div className="max-w-[250px]">Reporter email</div>
                  </TableHead>
                  <TableHead className={`button ${theme === "dark"? "bg-metal-800 text-metal-300":""}`}>
                    <div className="w-[80px]">Commenter</div>
                  </TableHead>
                  <TableHead className={`button ${theme === "dark"? "bg-metal-800 text-metal-300":""}`}>
                    <div className="w-[80px]">comment</div>
                  </TableHead>
                  <TableHead className={`button ${theme === "dark"? "bg-metal-800 text-metal-300":""}`}>
                    <div className="w-[85px]">Feedback</div>
                  </TableHead>
                  <TableHead className={`button ${theme === "dark"? "bg-metal-800 text-metal-300":""}`}>
                    <div className="w-[90px]">Action</div>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {reportDatas.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <div className={`max-w-[250px] truncate ${theme === "dark"? " text-metal-300":""}`}>
                        {item.repoter}
                      </div>
                    </TableCell>
                    <TableCell className={` ${theme === "dark"? " text-metal-300":""}`}>{item.commenter}</TableCell>
                    <TableCell className={` ${theme === "dark"? " text-metal-300":""}`}>
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
                    <TableCell className={` ${theme === "dark"? " text-metal-300":""}`}>{item.feedback}</TableCell>
                    <TableCell>
                      <Button
                        className={` ${theme !=="dark"?"bg-red-100 text-rose-500":"bg-metal-600 text-metal-300"}`}
                        onClick={() => handleDelete(item._id, item.commentId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <DataNotFound
              title={"No Report Available"}
              description={" No one Report yet."}
            />
          )}
        </>
      )}
      {/* modal  */}
      <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
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

export default ReportedActivities;
