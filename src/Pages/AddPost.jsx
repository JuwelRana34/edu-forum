import { useForm } from "react-hook-form";
import { Button, Input, Label, Textarea, toast } from "keep-react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import SecureAxios from "../Hook/SecureAxios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/AuthContext";
import {Link} from 'react-router'
import Loading from "../Components/Loading";
import { IoWarningOutline } from "react-icons/io5";
import { FaArrowsSpin } from "react-icons/fa6";
import ThemeContext from "../Context/ThemeProvider";
function AddPost() {
  const { register, handleSubmit, reset } = useForm();
  const [tagOptions, setTagOptions] = useState([]);
  const [selectOption, setSelectionOption] = useState(null);
  const { user} = useContext(UserContext);
  const [totalpost, setTotalPost]= useState(0)
  const [membership, setMemberShip]= useState(null)
  const [isLoading , setIsLoading] = useState(true)
  const [isPosting , setIsPosting] = useState(false)
  const {theme} =useContext(ThemeContext)

  // check post count
 useEffect(() => {
   const result = async () =>
     await SecureAxios.get(`/checkPostCount?email=${user?.email}
      `).then(({data}) =>{

        setTotalPost(data.postCount)
        setMemberShip(data.membership)
        setIsLoading(false)
      })
   result();
 }, [user?.email]);
     
    
  // tags fetch
  const { data } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const result = await SecureAxios.get(`/tag`);
      const option = result.data.map((tag) => ({
        value: tag.tag,
        label: tag.tag,
      }));
      setTagOptions(option);
      return result.data;
    },
  });
  
  // form submit func
  const onSubmit = (data) => {
    setIsPosting(true)
    if (!data.Title) {
      toast.error("Please enter Title");
      return;
    }
    if (!selectOption) {
      toast.error("Please select a tag");
      return;
    }
    if (!data.Description) {
      toast.error("Please enter Description");
      return;
    }

    const postData = {
      ...data,
      tag: selectOption.value,
      Author_Image: user.photoURL,
      Author_Name: user.displayName,
      Author_Email: user.email,
      UpVote: 0,
      DownVote: 0,
    };
    SecureAxios.post(`/post`, postData)
      .then((res) => {
        toast.success("Post added successfully");
        setSelectionOption(null);
        reset();
        setIsPosting(false)
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
      });
  };



  return (
    <div className="min-h-screen">
      <h1 className={`${theme === "dark" ? "text-metal-300":'text-metal-800'} my-10  text-center text-3xl font-bold capitalize`}>
        {" "}
        add post{" "}
      </h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" flex justify-center  w-full">
          {totalpost >= 5 && membership !== "gold" ? (
            <div className=" text-center">
              <h2 className="text-red-500 h2 mb-2 ">
                <IoWarningOutline className=" inline text-3xl" /> You have
                already added 5 posts. Please delete some old posts to add more
                or become a gold member to add more posts.
              </h2>

              <Link to={"/MemberShip"} className="button ">
                become a gold member
              </Link>
            </div>
          ) : (
            <form
              className=" w-10/12 gap-4 md:grid grid-cols-2   "
              onSubmit={handleSubmit(onSubmit)}
            >
              <fieldset className="max-w-md space-y-1">
                <Label htmlFor="name">Enter Title</Label>
                <Input
                className={ `${theme === "dark" && "bg-metal-700 border-none"}`}
                  id="name"
                  {...register("Title")}
                  placeholder="Enter Title"
                  type="text"
                />
              </fieldset>
              <Select className={ ` basic-single w-full mt-7 my-2`}
                classNamePrefix="select"
                onChange={(selectOption) => setSelectionOption(selectOption)}
                name="tag"
                value={selectOption}
                options={tagOptions}

                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: theme === "dark" ? "#3d4a5c" : "#fff", 
                    color: theme === "dark" ? "#d1d5db" : "#000", 
                    borderColor: theme === "dark" ? "#374151" : "#d1d5db", 
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: theme === "dark" ? "#1f2937" : "#fff", 
                  }),
                  option: (baseStyles, { isFocused }) => ({
                    ...baseStyles,
                    backgroundColor: isFocused
                      ? theme === "dark"
                        ? "#374151"
                        : "#e5e7eb"
                      : "transparent",
                    color: theme === "dark" ? "#d1d5db" : "#000",
                  }),
                  
                }}
              />

              <fieldset className="max-w-md  space-y-1">
                <Label htmlFor="name">Post Description</Label>
                <Textarea className={ `${theme === "dark" && "bg-metal-700 border-none"} col-span-2 `}
                 
                  id="name"
                  {...register("Description")}
                  placeholder="Enter description"
                  type="text"
                />
              </fieldset>

              <br />
              <Button
                className={`${theme === "dark"? "bg-metal-800 text-metal-300":" bg-blue-500 text-white"} w-full   cursor-pointer md:col-span-2 rounded py-3 `}
                type="submit"
              >
                {isPosting ? (
                  <>
                    <span className=" animate-pulse">Posting... </span>
                    <span className="text-white animate-spin">
                      <FaArrowsSpin className="text-xl" />
                    </span>
                  </>
                ) : (
                  "Post"
                )}
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default AddPost;
