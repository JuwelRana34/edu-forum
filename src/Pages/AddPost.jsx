import { useForm } from "react-hook-form";
import { Input, Label, Textarea, toast } from "keep-react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import SecureAxios from "../Hook/SecureAxios";
import { useContext, useState } from "react";
import UserContext from "../Context/AuthContext";
function AddPost() {
  const { register, handleSubmit, reset } = useForm();
  const [tagOptions, setTagOptions] = useState([]);
  const [selectOption, setSelectionOption] = useState(null);
  const { user } = useContext(UserContext);
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
          console.log(res);
          toast.success("Post added successfully");
          setSelectionOption(null)
          reset();
        })
       .catch((err) => {
          console.error(err);
          toast.error("Failed to add post");
        });
  };
  return (
    <div>
      <h1 className=" my-10 text-metal-800 text-center text-3xl font-bold capitalize">
        {" "}
        add post{" "}
      </h1>
      <div className=" flex justify-center  w-full">
        <form
          className=" w-10/12 gap-4 md:grid grid-cols-2   "
          onSubmit={handleSubmit(onSubmit)}
        >

          <fieldset className="max-w-md space-y-1">
            <Label htmlFor="name">Enter Title</Label>
            <Input
              id="name"
              {...register("Title")}
              placeholder="Enter Title"
              type="text"
            />
          </fieldset>
          <Select
            className="basic-single w-full mt-7 my-2"
            classNamePrefix="select"
            onChange={(selectOption) => setSelectionOption(selectOption)}
            name="tag"
            value={selectOption}
            options={tagOptions}
          />


          <fieldset className="max-w-md  space-y-1">
            <Label htmlFor="name">Post Description</Label>
            <Textarea
            className="col-span-2 "
              id="name"
              {...register("Description")}
              placeholder="Enter description"
              type="text"
            />
          </fieldset>
          

          <br />
          <input
            className=" w-full  cursor-pointer md:col-span-2 rounded py-3 bg-blue-500 text-white"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}

export default AddPost;
