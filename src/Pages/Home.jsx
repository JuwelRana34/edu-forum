import { Link, useNavigate } from "react-router";
import SecureAxios from "../Hook/SecureAxios";
import { useQuery } from "@tanstack/react-query";
import Banner from "../Components/Banner";
import { useState } from "react";
import { BiComment, BiSolidUpvote } from "react-icons/bi";
import Loading from "../Components/Loading";
import DataNotFound from "../Components/DataNotFound";
import { Avatar, AvatarFallback, AvatarImage, Select, SelectAction, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from 'keep-react'

import axios, { all } from "axios";
import Announcements from "../Components/Announcements";
function Home() {
  const [tag, setTag] = useState("");
  const [search, setSearch] = useState("");
  const [AllPosts, setAllPosts] = useState([]);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const { data: Posts = [], isLoading } = useQuery({
    queryKey: ["posts", tag, search],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API}/AllPost?tag=${tag}&search=${search}`
      );
      setAllPosts(result.data)
      return result.data;
    },
  });

  const { data } = useQuery({
    queryKey: ["filterPopulerPost"],
    enabled: sortByPopularity,
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API}/sortByPopularity`
      );
   
      setAllPosts(result.data);
      
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

      <section className="  bg-metal-50">
        {/* tags  */}
        <div className=" hidden md:block p-5 ">
          <div className="bg-white rounded p-5 flex flex-wrap justify-evenly gap-2">
            <h2 className="h2">Tags:</h2>
            <button
              onClick={() => {
                setSortByPopularity(false);
                setSearch("");
                setTag("");
              }}
              className="bg-gray-200 flex-1 mx-auto rounded py-2 font-semibold focus:bg-emerald-100"
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
                className="bg-gray-200 flex-1 mx-auto rounded p-2 font-semibold hover:bg-emerald-200  focus:bg-emerald-100"
              >
                {tag.tag}
              </button>
            ))}
          </div>
        </div>

        {/* pots  */}
        <div className=" space-y-5 px-5 pb-5 md:w-10/12 mx-auto">
          <div className="text-end flex justify-evenly gap-2 md:justify-end">
            <div className="md:hidden w-full  ">
              <Select>
                <SelectAction className="w-full">
                  <SelectValue placeholder="Select tag" />
                </SelectAction>
                <SelectContent className=" overflow-y-scroll">
                  <SelectGroup>
                    <SelectLabel>Tags</SelectLabel>
                    <button
                      onClick={() => {
                        setSortByPopularity(false);
                        setSearch("");
                        setTag("");
                      }}
                      className="  button text-sm md:text-neutral bg-white text-metal-700 capitalize "
                    >
                      All
                    </button>
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
              onClick={() => setSortByPopularity(true)}
              className="  button shadow text-sm md:text-white bg-[#23a8fe] text-white capitalize "
            >
              Sort by Popularity
            </button>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {AllPosts.length <= 0 ? (
                <DataNotFound title={"Post Not Found"} description={"No Post available right now"} />
              ) : (
                <>
                  {AllPosts.map((item) => (
                    <div
                      key={item._id}
                      className=" w-full mx-auto border rounded-lg shadow-lg p-2 bg-white"
                    >
                      <div className="flex justify-between items-center mb-2">
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
                          <span className="text-sm text-blue-400">
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
                          <div className="flex items-center space-x-1 hover:text-blue-600">
                            <BiSolidUpvote />

                            <span>{item.UpVote}</span>
                          </div>

                          <div className="flex items-center space-x-1 hover:text-blue-600">
                            <BiComment />
                            <span>{item?.comments?.length}</span>
                          </div>
                        </div>
                        <span className="text-sm text-center text-gray-500">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
