import React from "react";
import cookie from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const Private = () => {
  const navigate = useNavigate();
  const { state } = React.useContext(AuthContext);
  const { isAuthenticated } = state;
  const cookies = cookie.get();

  // check auth
  React.useEffect(() => {
    if (!isAuthenticated && !cookies?.token) {
      navigate("/");
    }
  }, [isAuthenticated, cookies]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default React.memo(Private);
