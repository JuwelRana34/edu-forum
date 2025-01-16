import { useContext } from "react";

import { Navigate, useLocation } from "react-router";
import UserContext from "../Context/AuthContext";
import Loading from "../Components/Loading";
// import Loading from '../Components/Loading'

// eslint-disable-next-line react/prop-types
function PrivetRoute({ children }) {
  const { user, isLoading } = useContext(UserContext);
  const location = useLocation();

  if (isLoading) {
    return (
    <Loading/>
    );
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/JoinUs"></Navigate>;
  }
  return children;
}

export default PrivetRoute;
