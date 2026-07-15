import { Navigate , Outlet } from "react-router-dom";
import { tokenStorage } from "../Utils/tokenStorage";

const PublicRoute = () => {
  const accessToken = tokenStorage.getAccessToken();

  if (accessToken) {
    return <Navigate to="/boards" replace />;
  }

    return <Outlet />;
};

export default PublicRoute;


