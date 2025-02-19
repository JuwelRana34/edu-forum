import { Link, useNavigate } from "react-router";
import SecureAxios from "../Hook/SecureAxios";
import { useQuery } from "@tanstack/react-query";
import Banner from "../Components/Banner";
import { useEffect, useState } from "react";
import { BiComment, BiSolidUpvote } from "react-icons/bi";
import Loading from "../Components/Loading";
import DataNotFound from "../Components/DataNotFound";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Select,
  SelectAction,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "keep-react";

import axios, { all } from "axios";
import Announcements from "../Components/Announcements";
import NewsLatter from "../Components/NewsLatter";
import GamificationAward from "../Components/GamificationAward";
import Learningpath from "../Components/Learningpath";
import EventsWebinars from "../Components/EventsWebinars";
function Home() {
  const [tag, setTag] = useState("");
  const [search, setSearch] = useState("");
  const [AllPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const stepItems =[
      "Sign up and create your profile.",
      "Explore different discussion categories.",
      "Ask questions and share knowledge with the community.",
      "Engage in discussions, get expert answers, and earn badges.",
      "Stay updated with the latest educational resources and events.",
    ]
  
  const { data: Posts = [], isLoading } = useQuery({
    queryKey: ["posts", tag, search, currentPage,sortByPopularity],
    enabled: !sortByPopularity,
    queryFn: async () => {
      const result = await axios.get(
        `${
          import.meta.env.VITE_API
        }/AllPost?tag=${tag}&search=${search}&page=${currentPage}&limit=${limit}`
      );
      setAllPosts(result.data.posts);
      setTotalPages(result.data.totalPages);

      return result.data;
    },
  });


  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    
    }
  };
  

  const { data=[] } = useQuery({
    queryKey: ["filterPopulerPost", currentPage],
    enabled: sortByPopularity,
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API}/sortByPopularity?page=${currentPage}&limit=${limit}`
      );

      setAllPosts(result.data.posts);
      setTotalPages(result.data.totalPages);
      return result.data;
    },
  });

  //get tag
  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const result = await SecureAxios.get(`/tag`);

      return result.data;
    },
  });

  return (
    <div className=" container min-h-screen mx-auto">
      <Banner setSearch={setSearch} />
      {/* announcement */}

      <Announcements />

      <section className=" dark:text-metal-300 dark:bg-metal-800  bg-metal-50">
        {/* tags  */}
        <div className=" hidden md:block p-5 dark:bg-metal-700">
          <div className="bg-white dark:bg-metal-800 rounded p-5 flex flex-wrap justify-evenly gap-2">
            <h2 className="h2">Tags:</h2>
            <button
              onClick={() => {
                setSortByPopularity(false);
                setSearch("");
                setTag("");
              }}
              className="bg-gray-200 dark:bg-metal-700 flex-1 mx-auto rounded py-2 font-semibold focus:bg-emerald-100"
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag._id}
                onClick={() => {
                  setSortByPopularity(false);
                  setSearch("");
                  setTag(tag.tag);
                }}
                className="bg-gray-200 dark:bg-metal-700 flex-1 mx-auto rounded p-2 font-semibold hover:bg-emerald-200  focus:bg-emerald-100"
              >
                {tag.tag}
              </button>
            ))}
          </div>
        </div>

        {/* pots  */}
        <div className=" space-y-5 px-5 mt-2 md:pt-3 pb-5 md:w-10/12 mx-auto">
          <div className="text-end pt-3 md:pt-0 flex justify-evenly gap-2 md:justify-end">
            <div className="md:hidden w-full  ">
              <Select>
                <SelectAction className="w-full">
                  <SelectValue placeholder="Select tag" />
                </SelectAction>
                <SelectContent className=" overflow-y-scroll">
                  <SelectGroup>
                    <SelectLabel>Tags</SelectLabel>
                    <SelectItem
                      onClick={() => {
                        setSortByPopularity(false);
                        setSearch("");
                        setTag("");
                      }}
                      value={"All"}
                      className="  button text-sm md:text-neutral bg-white text-metal-700 capitalize "
                    >
                      All
                    </SelectItem>
                    {tags.map((tag) => (
                      <SelectItem
                        key={tag._id}
                        onClick={() => {
                          setSortByPopularity(false);
                          setSearch("");
                          setTag(tag.tag);
                        }}
                        value={tag.tag}
                      >
                        {tag.tag}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <button
              onClick={() =>{ 
                setSortByPopularity(true)
                setSearch("");
                setTag("");
                setCurrentPage(1)
              }}
              className="  button shadow text-sm dark:bg-metal-700 dark:text-metal-300 md:text-white bg-[#23a8fe] text-white capitalize "
            >
              Sort by Popularity
            </button>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {AllPosts.length <= 0 ? (
                <DataNotFound
                  title={"Post Not Found"}
                  description={"No Post available right now"}
                />
              ) : (
                <>
                  {AllPosts.map((item) => (
                    <div
                      key={item._id}
                      className=" w-full mx-auto border rounded-lg shadow-lg p-2 px-4 bg-white dark:bg-metal-700 dark:border-metal-500"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2"></div>
                      </div>
                      <div className="flex items-start ">
                        <div className="w-8 h-8 rounded-full    flex justify-center items-start text-lg font-bold mr-2">
                          <Avatar>
                            <AvatarImage src={item.Author_Image} />
                            <AvatarFallback className=" uppercase font-semibold text-base">
                              {item.Author_Name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <p className="font-semibold">{item.Author_Name}</p>
                          <span className="text-sm dark:text-metal-300 text-blue-400">
                            # {item.tag}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`post/${item._id}`}
                        className=" text-2xl md:text-2xl font-bold hover:underline hover:text-blue-500  mt-1"
                      >
                        {item.Title}
                      </Link>
                      <p>
                        {item.Description.length > 250
                          ? `${item.Description.substring(0, 250)}...`
                          : item.Description}
                      </p>
                      <div className="flex mt-2 justify-between items-center">
                        <div className="flex space-x-3 text-gray-600">
                          <div className="flex  items-center space-x-1 dark:text-metal-300 hover:text-blue-600">
                            <BiSolidUpvote />

                            <span>{item.UpVote}</span>
                          </div>

                          <div className="flex items-center space-x-1 dark:text-metal-300 hover:text-blue-600">
                            <BiComment />
                            <span>{item?.comments?.length}</span>
                          </div>
                        </div>
                        <span className="text-sm text-center text-gray-500 dark:text-metal-300">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {/* pagination */}
                  <div className="text-center">
                    {" "}
                    <button className="button dark:bg-metal-700"
                      id="prev-btn"
                      disabled={currentPage === 1}
                      onClick={handlePrev}
                    >
                      Previous
                    </button>{" "}
                    <span className="px-2">
                      Page {currentPage} of {totalPages}
                    </span>{" "}
                    <button className="button dark:bg-metal-700" id="next-btn" onClick={handleNext}>
                      Next
                    </button>{" "}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* news later */}
      <NewsLatter/>

      <div className="max-w-3xl mx-auto my-5 border dark:border-none w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-3xl dark:text-metal-300 font-semibold text-center text-gray-800  mb-6">
            How It Works
          </h2>

          <div className="space-y-6">
            {stepItems.map((step, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 dark:bg-gray-700 p-4 rounded-lg shadow"
              >
                <div className="w-10 h-10 flex items-center justify-center text-blue-500 md:text-white font-bold  md:bg-blue-500 dark:bg-transparent rounded-full">
                  {index + 1}
                </div>
                <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">{step}</p>
              </div>
            ))}
          </div>
        
    </div>
 
 {/* award  */}
 <GamificationAward/>

 <Learningpath/>

 <EventsWebinars/>
    </div>
  );
}

export default Home;
