import { useState } from "react";
import SecureAxios from "../Hook/SecureAxios";
import { useQuery } from '@tanstack/react-query'
import Banner from "../Components/Banner";
function Home() {
  const {data:users =[], isLoading}= useQuery({ queryKey: ["users"], queryFn: async()=>{
    const result = await  SecureAxios.get('/users')
    return result.data;
  } });
console.log(users)
//  if (isLoading) return  <h1>loadingg...</h1>
  return (
    <div className=" container mx-auto">
      <Banner/>

      {/* post section  */}
      <section className="flex bg-black">
        <div className="bg-red-200 p-5 w-[70%]">
         posts
      </div>
      <div className="bg-blue-200 p-5 w-[30%]">
        categoryu
      </div>
      </section>
      
    </div>
  );
}

export default Home;
