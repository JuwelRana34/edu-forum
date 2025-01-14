import { Routes, Route } from "react-router";
import App from "../App";
import Home from "../Pages/Home";
import JoinUs from "../Pages/JoinUs";
import Registration from "../Pages/Registration";
import Not_found from "../Pages/Not_found";
import PrivetRoute from "./PrivetRoute";
import MemberShip from "../Pages/MemberShip";
import Dashboard from "../Pages/Dashboard";
import MyPosts from "../Pages/MyPosts";
import MyProfile from "../Pages/MyProfile";
import AddPost from "../Pages/AddPost";
import AdminProfile from "../Pages/AdminProfile";
import ReportedActivities from "../Pages/ReportedActivities";
import ManageUsers from "../Pages/ManageUsers";
import MakeAnnouncement from "../Pages/MakeAnnouncement";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="JoinUs" element={<JoinUs />} />
        <Route path="MemberShip" element={<MemberShip />} />
        
        <Route path="registration" element={<Registration />} />
      </Route>
      
      <Route path="Dashboard" element={<Dashboard />}>
          {/* normar user routs  */}
          <Route path="MyPosts" element={<MyPosts />} />
          <Route path="MyProfile" element={<MyProfile />} />
          <Route path="AddPost" element={<AddPost />} />
          {/* admin routs  */}
          <Route path="AdminProfile" element={<AdminProfile />} />
          <Route path="ManageUsers" element={<ManageUsers />} />
          <Route path="MakeAnnouncement" element={<MakeAnnouncement />} />
          <Route path="ReportedActivities" element={<ReportedActivities />} />
        </Route>
      <Route path="*" element={<Not_found />} />
    </Routes>
  );
};

export default AppRoute;
