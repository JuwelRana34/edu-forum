import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import UserContext from "../Context/AuthContext";
import SecureAxios from "../Hook/SecureAxios";
import useCheckAdmin from "../Routers/useCheckAdmin";

function MyProfile() {
  const { user } = useContext(UserContext);
  const role = useCheckAdmin()
  const { data: userInfo = {} } = useQuery({
    queryKey: ["userinfo"],
    queryFn: async () => {
      const res = await SecureAxios.get(`/user?email=${user.email}`);
      return res.data;
    },
  });
  const { data:recentPost = [] } = useQuery({
    queryKey: ["userRecentPost", user?.email],
    queryFn: async () => {
      const res = await SecureAxios.get(`/user/recentPost?email=${user.email}`);
      return res.data;
    },
  });



  return (
    <div>
      <div>
        <h2 className="text-4xl font-bold text-center my-5">welcome back! <span className="text-green-500">{userInfo.name}</span></h2>
        <h1> you member since - { new Date(userInfo.createdAt).toDateString() }</h1>
        {/* Your profile information goes here */}
        <div>
          <img className="w-24 h-24 rounded-md" src={userInfo.photo} alt="" />
          <div className="flex gap-4 items-center">
            <span>badges: </span>
           {userInfo.badge !== "gold"? <img
            className="h-10 w-10"
            src="https://cdn-icons-png.flaticon.com/128/12927/12927172.png"
            alt=""
          />: 
          <img
            className="h-10 w-10"
            src="https://cdn-icons-png.flaticon.com/128/6369/6369589.png"
            alt=""
          />
           }
          </div>
          
        </div>

        {recentPost.map(post => {
          return (
            <div key={post._id} className="my-5">
              <h3>{post.Title}</h3>
              <p>{post.description}</p>
              <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
            </div>
          );
        })}
        
      </div>
    </div>
  );
}

export default MyProfile;
