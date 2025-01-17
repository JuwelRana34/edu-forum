import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import UserContext from "../Context/AuthContext";
import SecureAxios from "../Hook/SecureAxios";
import useCheckAdmin from "../Routers/useCheckAdmin";
import Loading from "../Components/Loading";
import Profile from "../Components/Profile";

function MyProfile() {
  const { user } = useContext(UserContext);
  const role = useCheckAdmin();
  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ["userinfo"],
    queryFn: async () => {
      const res = await SecureAxios.get(`/user?email=${user.email}`);
      return res.data;
    },
  });
  const { data: recentPost = [] } = useQuery({
    queryKey: ["userRecentPost", user?.email],
    queryFn: async () => {
      const res = await SecureAxios.get(`/user/recentPost?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      
      <h2 className=" text-2xl md:text-4xl font-bold text-center my-5">
        welcome back! <span className="text-green-500">{userInfo.name}</span>
      </h2>
      <Profile
      
      userInfo = {userInfo}
        photo={userInfo.photo}
        name={userInfo.name}
        badge={userInfo.badge}
        role={role}
        createdAt={userInfo.createdAt}
        recentPost={recentPost}
        email={userInfo.email}
      />
    </div>
  );
}

export default MyProfile;
