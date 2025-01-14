import { useState } from "react";
import SecureAxios from "../Hook/SecureAxios";
import { useQuery } from '@tanstack/react-query'
function Home() {
  const {data:users =[], isLoading}= useQuery({ queryKey: ["users"], queryFn: async()=>{
    const result = await  SecureAxios.get('/users')
    return result.data;
  } });
console.log(users)
 if (isLoading) return  <h1>loadingg...</h1>
  return (
    <>
      <h1 className=" animate-pulse text-green-600 text-xl">
       {users.map(user=> user.name )}
      </h1>
    </>
  );
}

export default Home;
