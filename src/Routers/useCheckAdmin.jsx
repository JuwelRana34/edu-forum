import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SecureAxios from "../Hook/SecureAxios";
import UserContext from "../Context/AuthContext";

function useCheckAdmin() {
  const { user } = useContext(UserContext);
  const { data: isAdmin } = useQuery({
    queryKey: [user?.email, "IsAdmin"],
    // enabled:!!user?.email && !!localStorage.getItem('token'),
    queryFn: async () => {
      const result = await SecureAxios.get(`/admin/${user.email}`);

      return result.data.admin;
    },
  });

  let role = "user";
  if (isAdmin) {
    role = "admin";
  }
  return role;
}

export default useCheckAdmin;
