import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SecureAxios from "../Hook/SecureAxios";
import UserContext from "../Context/AuthContext";


function useCheckAdmin() {
  const { user } = useContext(UserContext);
  const { data: role } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const result = await SecureAxios.get(`/admin`);
      
      return result.data;
    },
    
  });



  return role;
}

export default useCheckAdmin;
