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
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Loading from "../Components/Loading";
import LoadingTable from "../Components/LoadingTable";

function ManageUsers() {
  let [isOpen, setIsOpen] = useState(false);
  let [name, setName] = useState(" ");
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const { data: users = {}, refetch, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const response = await SecureAxios.get(
        `/users?email=${user.email}&page=${page}`
      );
      return response.data;
    },
  });

  const { items = [], totalPages } = users;

  const handelMakeAdmin = (name) => {
    setName(name);
    setIsOpen(true);
  };

  const handelcnfirm = async () => {
    await SecureAxios.put(`/makeAdmin/?userName=${name}`)
      .then((data) => {
        refetch();
        toast.success("Successfully made admin");
      })
      .catch((err) => {
        toast.error("Failed to make admin");
      });
  };
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl py-5 text-center font-bold">My Posts</h1>
      {isLoading ? (
        <LoadingTable />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="max-w-[250px]">User Name</div>
              </TableHead>
              <TableHead>
                <div className="w-[80px]">User Email</div>
              </TableHead>
              <TableHead>
                <div className="w-[85px]">Make Admin </div>
              </TableHead>
              <TableHead>
                <div className="w-[90px]">Subscription Status </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className="max-w-[250px] truncate">{item.name}</div>
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="">
                  {item.role === "admin" ? (
                    <h1 className="text-green-500 pl-8 ">Admin</h1>
                  ) : (
                    <button
                      className="py-2 px-3 text-xs md:text-sm rounded-full bg-orange-100 text-orange-500"
                      onClick={() => handelMakeAdmin(item.name)}
                    >
                      {" "}
                      Make Admin
                    </button>
                  )}
                </TableCell>
                <TableCell>{item.badge}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 py-4">
        <button
          className="button"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="button"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* popup
       */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed backdrop-blur bg-black/30 inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg rounded space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">
              Are you sure to make a Admin
              <span className="text-green-500"> {name}</span> ?{" "}
            </DialogTitle>

            <div className="flex gap-4">
              <button
                className="text-green-500 bg-green-100 rounded-md py-2 px-3 font-semibold"
                onClick={() => {
                  handelcnfirm();
                  setIsOpen(false);
                }}
              >
                Yes, sure
              </button>
              <button
                className="text-red-500 bg-rose-100 rounded-md py-2 px-3 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default ManageUsers;
