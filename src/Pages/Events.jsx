import React, { useContext, useEffect } from "react";
import UserContext from "../Context/AuthContext";
import SecureAxios from "../Hook/SecureAxios";
import { useQuery } from "@tanstack/react-query";

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

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Loading from "../Components/Loading";
import LoadingTable from "../Components/LoadingTable";
import ThemeContext from "../Context/ThemeProvider";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import useCheckAdmin from "../Routers/useCheckAdmin";

function Events() {
  const role = useCheckAdmin();
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  const { data: events = [], refetch } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await SecureAxios.get(`/allEvents`);
      return response.data;
    },
  });

  const {
    data: MyEvents = [],
    refetch: myEventRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["MyEvents", user.email],
    queryFn: async () => {
      const response = await SecureAxios.get(`/registerEvents/${user.email}`);
      return response.data;
    },
  });
  console.log("MyEvents", MyEvents);

  const handelDelete = async () => {
    Swal.fire({
      title: "Are You Sure to delete all event?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await SecureAxios.delete(`/registerEvents/allEvents`);
          refetch();
          Swal.fire("Deleted!", "", "success");
        } catch (error) {
          toast.error("Failed to delete user");
        }
      }
    });
  };
  return (
    <>
      {role === "admin" ? (
        <div className="min-h-screen">
          <h1 className="text-3xl py-5 text-center font-bold">Manage Events</h1>
          {isLoading ? (
            <LoadingTable />
          ) : (
            <>
              <Table
                className={`button ${
                  theme === "dark" ? "bg-metal-800 text-metal-300" : ""
                }`}
              >
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className={`button ${
                        theme === "dark" ? "bg-metal-800 text-metal-300" : ""
                      }`}
                    >
                      <div className="max-w-[250px]">User Name</div>
                    </TableHead>
                    <TableHead
                      className={`button ${
                        theme === "dark" ? "bg-metal-800 text-metal-300" : ""
                      }`}
                    >
                      <div className="w-[80px]">User Email</div>
                    </TableHead>
                    <TableHead
                      className={`button ${
                        theme === "dark" ? "bg-metal-800 text-metal-300" : ""
                      }`}
                    >
                      <div className="w-[80px]">
                        workshop Title
                      </div>
                    </TableHead>
                    <TableHead
                      className={`button ${
                        theme === "dark" ? "bg-metal-800 text-metal-300" : ""
                      }`}
                    >
                      <div className="w-[80px]">
                        Date & Time
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <div
                          className={`max-w-[250px] truncate ${
                            theme === "dark" ? " text-metal-300" : ""
                          }`}
                        >
                          {item.name}
                        </div>
                      </TableCell>
                      <TableCell
                        className={` ${
                          theme === "dark" ? " text-metal-300" : ""
                        }`}
                      >
                        {item.user}
                      </TableCell>
                      <TableCell
                        className={` ${
                          theme === "dark" ? " text-metal-300" : ""
                        }`}
                      >
                        {item.title}
                      </TableCell>
                      <TableCell
                        className={` ${
                          theme === "dark" ? " text-metal-300" : ""
                        }`}
                      >
                        {item.date} <br />
                        {item.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {events.length > 0 && (
                <Button
                  onClick={handelDelete}
                  className="bg-red-500 text-white flex items-center gap-2 mt-4 mx-3"
                >
                  Delete All Events
                  <FaTrash className="text-white" size={20} />
                </Button>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="min-h-screen">
          <h1 className="text-3xl py-5 text-center font-bold"> Booked Events</h1>
          {isLoading ? (
            <LoadingTable />
          ) : (
            <>
              {MyEvents.length > 0 ? (
                <Table
                  className={`button ${
                    theme === "dark" ? "bg-metal-800 text-metal-300" : ""
                  }`}
                >
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className={`button ${
                          theme === "dark" ? "bg-metal-800 text-metal-300" : ""
                        }`}
                      >
                        <div className="max-w-[250px]">Name</div>
                      </TableHead>
                      <TableHead
                        className={`button ${
                          theme === "dark" ? "bg-metal-800 text-metal-300" : ""
                        }`}
                      >
                        <div className="w-[80px]"> Email</div>
                      </TableHead>
                      <TableHead
                        className={`button ${
                          theme === "dark" ? "bg-metal-800 text-metal-300" : ""
                        }`}
                      >
                        <div className="w-[80px]">
                          workshop Title
                        </div>
                      </TableHead>
                      <TableHead
                        className={`button ${
                          theme === "dark" ? "bg-metal-800 text-metal-300" : ""
                        }`}
                      >
                        <div className="w-[80px]">
                          Date & time
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MyEvents.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <div
                            className={`max-w-[250px] truncate ${
                              theme === "dark" ? " text-metal-300" : ""
                            }`}
                          >
                            {item.name}
                          </div>
                        </TableCell>
                        <TableCell
                          className={` ${
                            theme === "dark" ? " text-metal-300" : ""
                          }`}
                        >
                          {item.user}
                        </TableCell>
                        <TableCell
                          className={` ${
                            theme === "dark" ? " text-metal-300" : ""
                          }`}
                        >
                          {item.title}
                        </TableCell>
                        <TableCell
                          className={` ${
                            theme === "dark" ? " text-metal-300" : "text-green-500"
                          }`}
                        >
                          {item.date} <br />
                        {item.time}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex justify-center items-center py-5">
                  <h1 className="text-2xl font-bold text-red-500">
                    No Events Found
                  </h1>
                </div>
              )}
            </>
          )}
        </div>
      )}{" "}
    </>
  );
}

export default Events;
