import {Link} from 'react-router'
import SecureAxios from "../Hook/SecureAxios";
import { useQuery } from '@tanstack/react-query'
import Banner from "../Components/Banner";
import { useState } from "react";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
function Home() {
 const [tag, setTag] = useState('')
 const [search, setSearch] = useState('')

  // get all posts
  const {data:AllPosts =[], isLoading}= useQuery({ queryKey: ["allPosts"], queryFn: async()=>{
    const result = await  SecureAxios.get(`/AllPost?tag=${tag}&search=${search}`);
    return result.data;
  } });

//  if (isLoading) return  <h1>loadingg...</h1>
  return (
    <div className=" container mx-auto">
      <Banner search={search}/>

      {/* post section  */}
      <section className="md:flex bg-metal-50">
        <div className=" space-y-5 p-5 md:w-[70%]">
         {AllPosts.map(item =>(
          <div className=" w-full mx-auto border rounded-lg shadow-lg p-4 bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <div className='flex items-center gap-2'>
                      
                     
                      <Link to={''} className="text-xl font-bold hover:underline hover:text-blue-500  mt-1">{item.Title}</Link>
                      <span className="text-sm text-gray-500"># {item.tag}</span>
                    </div>
                    <span className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-400 text-white flex justify-center items-center text-lg font-bold mr-3">
                    <img  className='rounded-full' src={item.Author_Image} alt="" srcset="" />
                    </div>
                    <div>
                      <p className="font-bold">{item.Author_Name}</p>
                      {/* <p className="text-sm text-gray-500">{item.Author_Email}</p> */}
                    </div>
                  
                  </div>
                 
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3 text-gray-600">
                      <button className="flex items-center space-x-1 hover:text-blue-600">
                        <BiSolidUpvote  />
            
                        <span>{item.UpVote}</span>
                      </button>
                      
                      <button className="flex items-center space-x-1 hover:text-blue-600">
                      <BiSolidDownvote />
                        <span>{item.DownVote}</span>
                      </button>
                    </div>
                    
                  </div>
                </div>
         ))}  
      </div>
      <div className="bg-blue-200 p-5 md:w-[30%]">
        categoryu
      </div>
      </section>
      
    </div>
  );
}

export default Home;
