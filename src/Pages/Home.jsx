import {Link} from 'react-router'
import SecureAxios from "../Hook/SecureAxios";
import { useQuery } from '@tanstack/react-query'
import Banner from "../Components/Banner";
import { useEffect, useState } from "react";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import Loading from '../Components/Loading'
import DataNotFound from '../Components/DataNotFound';
import useAxiosPublic from '../Hook/useAxiosPublic';
import axios from 'axios';
function Home() {
 const [tag, setTag] = useState('')
 const [search, setSearch] = useState('')
 const [AllPosts , setAllPosts]= useState([])
 const [sortByPopularity, setSortByPopularity] = useState(false);


  const { data:Posts = [],isLoading } = useQuery({
    queryKey: ["posts", tag, search],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API}/AllPost?tag=${tag}&search=${search}`);
       setAllPosts(result.data)
      return result.data;
    },
  });

 const {data }= useQuery({
   queryKey: ["filterPopulerPost"],
   enabled: sortByPopularity,
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API}/sortByPopularity`);
       setAllPosts(result.data)
      return result.data;
    },
  });
 

  //get tag 
  const { data:tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const result = await SecureAxios.get(`/tag`);
      
      return result.data;
    },
  });

  return (
    <div className=" container mx-auto">
      <Banner setSearch={setSearch}/>

      {/* post section  */}
      <section className="md:flex bg-metal-50">
        <div className=" space-y-5 p-5 md:w-[70%]">
          {isLoading ? <Loading/> :
          <>
         {AllPosts.length <= 0 ? <DataNotFound search={search}/>:
           <> 
           <div className='text-end'>

           <button onClick={()=>setSortByPopularity(true)}  className=' button shadow bg-white text-metal-700 capitalize '>Sort by Popularity</button>
           </div>
           {AllPosts.map(item =>(
          <div key={item._id} className=" w-full mx-auto border rounded-lg shadow-lg p-4 bg-white">
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
           </>
         }
           
          </>
          }
          
      </div>
      <div className="  p-5 md:w-[30%]">
        <div className='bg-white h-full rounded  py-5 flex flex-col  gap-5'>

        <button onClick={()=>{
          setSortByPopularity(false)
          setSearch('')
          setTag('')
        } } className='bg-gray-200 w-1/2 mx-auto rounded py-2 font-semibold focus:bg-emerald-100'>All </button>
        {
          tags.map(tag => (
            <button
              key={tag._id}
              onClick={() =>{ 
                setSortByPopularity(false)
                setSearch('')
                setTag(tag.tag)
              }}
              className={` focus:bg-emerald-100 bg-gray-200 rounded py-2 font-semibold  w-1/2 mx-auto`}
            >
              {tag.tag}
            </button>
            
          ))
          }
        </div>
      </div>
      </section>
      
    </div>
  );
}

export default Home;
