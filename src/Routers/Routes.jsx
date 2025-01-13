import { Routes, Route } from "react-router";
import App from "../App";
import Home from "../Pages/Home";
import JoinUs from "../Pages/JoinUs";
import Registration from "../Pages/Registration";
import Not_found from "../Pages/Not_found";
import PrivetRoute from "./PrivetRoute";
import MemberShip from "../Pages/MemberShip";

const AppRoute = () => {
  return(
    <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="JoinUs" element={  <JoinUs />  } />
      <Route path="MemberShip" element={  <MemberShip/>  } />
      <Route path="registration" element={<Registration />} />
    </Route>
    <Route path="*" element={<Not_found />} />
  </Routes>
  )
}

export default AppRoute;
