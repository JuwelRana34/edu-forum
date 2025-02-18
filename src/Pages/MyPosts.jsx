import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from "keep-react";
import SecureAxios from "../Hook/SecureAxios";
import { useContext, useState } from "react";
import UserContext from "../Context/AuthContext";
import { Link } from "react-router";
import DataNotFound from "../Components/DataNotFound";
import LoadingTable from "../Components/LoadingTable";
import ThemeContext from "../Context/ThemeProvider";
function MyPosts() {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [page, setPage] = useState(1);
  const {
    data: myPost = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myPosts", page],
    queryFn: async () => {
      const response = await SecureAxios.get(
        `/mypost?email=${user.email}&page=${page}`
      );
      return response.data;
    },
  });

  const { items = [], totalPages } = myPost;

  const handeldelete = async (id) => {
    await SecureAxios.delete(`/deleteMyPost/${id}?email=${user.email}`)
      .then((data) => {
        refetch();
        toast.success("Successfully deleted");
      })
      .catch((err) => {
        toast.error("Failed to delete");
      });
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl py-5 text-center font-bold">My Posts</h1>
      {isLoading ? (
        <LoadingTable/>
      ) : (
        <>
          {items.length <= 0 ? (
            <DataNotFound  title={"Post Not Found"} description={" you have not post yet."} />
          ) : (
            <Table className={`button ${theme === "dark"? "bg-metal-800 text-metal-300":""}`}>
              <TableHeader>
                <TableRow>
                  <TableHead className={`button ${theme === "dark"? "bg-metal-800 text-metal-300":""}`}>
                    <div className="max-w-[250px]">Post Title</div>
                  </TableHead>
                  <TableHead className={`button ${theme === "dark"? "bg-metal-800 text-metal-300":""}`}>
                    <div className="w-[80px]">Number of votes</div>
                  </TableHead>
                  <TableHead className={`button ${theme === "dark"? "bg-metal-800 text-metal-300":""}`}>
                    <div className="w-[85px]">Comment </div>
                  </TableHead>
                  <TableHead className={`button ${theme === "dark"? "bg-metal-800 text-metal-300":""}`}>
                    <div className="w-[90px]">Delete </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <div className={` ${theme === "dark"? " text-metal-300":""} max-w-[250px] truncate`}>{item.Title}</div>
                    </TableCell>
                    <TableCell className={`${theme === "dark"? " text-metal-300":""}`}>{item.UpVote + item.DownVote}</TableCell>
                    <TableCell>
                      <Link className={`py-2 rounded-md px-3 ${theme === "dark"? " text-metal-800 bg-metal-400":"text-green-500 bg-green-100"}  `} to={`/comments/${item._id}`}>
                        Comment
                      </Link>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handeldelete(item._id)}
                        className={`py-2 rounded-md px-3 ${theme === "dark"? " text-white bg-rose-400":"bg-rose-100 text-rose-500"}  `}
                       
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </>
      )}
      {/* Pagination Controls */}
      {items.length > 0 &&
      <div className="flex justify-center gap-4 py-4">
        <button
          className={`button ${theme === "dark"? " text-metal-300 bg-metal-800":""}`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className={`button ${theme === "dark"? " text-metal-300 bg-metal-800":""}`}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      }
    </div>
  );
}

export default MyPosts;
