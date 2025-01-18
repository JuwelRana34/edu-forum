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
import useCheckAdmin from "./useCheckAdmin";
import Adminprivet from "./Adminprivet";
import Comments from "../Pages/Comments";
import PostDetails from "../Pages/PostDetails";

const AppRoute = () => {
  const role = useCheckAdmin();
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="JoinUs" element={<JoinUs />} />
        <Route
          path="MemberShip"
          element={
            <PrivetRoute>
              <MemberShip />
            </PrivetRoute>
          }
        />
        
        <Route path="post/:id" element={<PostDetails />} />
        <Route path="registration" element={<Registration />} />
        <Route path="comments/:postId" element={<PrivetRoute><Comments /></PrivetRoute>} />
      </Route>

      <Route
        path="Dashboard"
        element={
          <PrivetRoute>
            <Dashboard />
          </PrivetRoute>
        }
      >
        {role === "admin" ? (
          <Route
            index
            element={
              <Adminprivet>
                <AdminProfile />
              </Adminprivet>
            }
          />
        ) : (
          <Route index element={<MyProfile />} />
        )}
        {/* normar user routs  */}
        <Route path="MyPosts" element={<MyPosts />} />

        <Route path="MyProfile" element={<MyProfile />} />
        <Route path="AddPost" element={<AddPost />} />
        

        {/* admin routs  */}

        <Route
          path="AdminProfile"
          element={
            <Adminprivet>
              <AdminProfile />
            </Adminprivet>
          }
        />
        <Route
          path="ManageUsers"
          element={
            <Adminprivet>
              <ManageUsers />
            </Adminprivet>
          }
        />

        <Route
          path="MakeAnnouncement"
          element={
            <Adminprivet>
              <MakeAnnouncement />
            </Adminprivet>
          }
        />
        <Route
          path="ReportedActivities"
          element={
            <Adminprivet>
              <ReportedActivities />
            </Adminprivet>
          }
        />
      </Route>
      <Route path="*" element={<Not_found />} />
    </Routes>
  );
};

export default AppRoute;
