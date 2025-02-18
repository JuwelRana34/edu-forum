import { Description, Field, Input, Label, Button } from "@headlessui/react";
import clsx from "clsx";
import { useContext, useState } from "react";
import { toast } from "keep-react";
import SecureAxios from "../Hook/SecureAxios";
import UserContext from "../Context/AuthContext";
import useCheckAdmin from "../Routers/useCheckAdmin";
import { useQuery } from "@tanstack/react-query";
import Profile from "../Components/Profile";

import { LabelList, Pie, PieChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "keep-react";
import ThemeContext from "../Context/ThemeProvider";

function AdminProfile() {
  const [tag, setTag] = useState("");
  const { user } = useContext(UserContext);
  const {theme}= useContext(ThemeContext)
  const role = useCheckAdmin();
  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ["userinfo"],
    queryFn: async () => {
      const res = await SecureAxios.get(`/user?email=${user.email}`);
      return res.data;
    },
  });
  const { data: allInfo = {} } = useQuery({
    queryKey: ["allInformation"],
    queryFn: async () => {
      const res = await SecureAxios.get(`/info-full-web`);
      return res.data;
    },
  });

  const handelTagPost = async () => {
    if (tag === "" || undefined || null)
      return toast.warning("please provide a tag");

    await SecureAxios.post(`/tag`, { tag: tag })
      .then(() => {
        setTag("");
        toast.success("Tags saved successfully");
      })
      .catch(() => {
        toast.error("Error saving tags");
        console.log("error saving tags");
      });
  };

  const chartData = [
    { browser: "Total User", visitors: allInfo.totalUser, fill: "#3CAAFA" },
    {
      browser: "Total Comment",
      visitors: allInfo.totalComment,
      fill: "#9631F5",
    },
    { browser: "Total Posts", visitors: allInfo.totalPosts, fill: "#38D6EF" },
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "#3CAAFA",
    },
    safari: {
      label: "Safari",
      color: "#9631F5",
    },
    firefox: {
      label: "Firefox",
      color: "#38D6EF",
    },
    edge: {
      label: "Edge",
      color: "#D638EE",
    },
    other: {
      label: "Other",
      color: "#afbaca",
    },
  };

  return (
    <>
      <div>
        <Profile
          photo={userInfo.photo}
          name={userInfo.name}
          badge={userInfo.badge}
          role={role}
          createdAt={userInfo.createdAt}
          email={userInfo.email}
        />
        {/* detail about information */}
        <div className="grid grid-cols-1 w-5/6 justify-items-center md:w-full mx-auto md:grid-cols-3 gap-2 lg:gap-10 px-5">
          <div className={`${theme === "dark"?"bg-metal-800 text-metal-300":'bg-gradient-to-tr bg-[#02AAB0] via-[#00CDAC] to-[#02AAB0 ] text-white'}  flex items-center  w-full p-5 rounded-md  mx-auto shadow-md `}>
            <h2 className="text-xl lg:text-3xl capitalize font-semibold">
              total posts <br /> {allInfo.totalPosts}
            </h2>
          </div>
          <div className={`${theme === "dark"?"bg-metal-800 text-metal-300":'bg-gradient-to-tr from-orange-500  to-red-500 text-white'} flex items-center  w-full p-5 rounded-md  mx-auto shadow-md `}>
            <h2 className="text-xl lg:text-3xl capitalize font-semibold">
              total Users <br /> {allInfo.totalUser}
            </h2>
          </div>
          <div className={` ${theme === "dark"?"bg-metal-800 text-metal-300":'bg-gradient-to-tr  from-pink-500  to-violet-500 text-white'}  flex items-center  w-full p-5 rounded-md  mx-auto shadow-md `}>
            <h2 className="text-xl lg:text-3xl capitalize font-semibold">
              total Comments <br /> {allInfo.totalComment}
            </h2>
          </div>
        </div>
        {/* pie chart
         */}
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full mx-auto "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser">
              <LabelList
                dataKey="browser"
                className="fill-white"
                stroke="none"
                fontSize={13}
                formatter={(value) => value}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* post tags */}
        <div className=" m-2 mb-10 lg:w-1/2 lg:mx-auto rounded-md border-2 hover:shadow-md p-4  ">
          <Field>
            <Label className=" h2 font-medium capitalize ">tag post.</Label>
            <Description className="text-sm/6 "></Description>
            <Input
            
              onChange={(e) => setTag(e.target.value)}
              value={tag}
              placeholder="type tags"
              className={clsx(
                "mt-3 block w-full  rounded-lg border border-blue-200 py-1.5 px-3 text-sm/6 ",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            <Button
              onClick={handelTagPost}
              className="inline-flex my-2 items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Add
            </Button>
          </Field>
        </div>
      </div>
    </>
  );
}

export default AdminProfile;
