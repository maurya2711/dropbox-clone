import React from "react";
import cookie from "js-cookie";
import Login from "./pages/Login";
import Public from "./layouts/public";
import Private from "./layouts/private";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LoadingBar from "react-top-loading-bar";
import { withCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import { actions, AuthContext } from "./contexts/authContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
function App() {
  const { state, dispatch } = React.useContext(AuthContext);
  const { isLoading } = state;
  const cookies = cookie.get();

  // Recheck user auth
  React.useEffect(() => {
    if (
      cookies?.id &&
      cookies?.token &&
      cookies?.userEmail &&
      cookies?.userName
    ) {
      const payload = {
        name: cookies?.userName,
        email: cookies?.userEmail,
        _id: cookies?.id,
      };
      dispatch({ type: actions.LOGIN_SUCCESS, payload });
    }
  }, []);

  const loadingRef = React.useRef(null);

  React.useEffect(() => {
    if (isLoading) {
      loadingRef.current.continuousStart();
    } else {
      loadingRef.current.complete();
    }
  }, [isLoading]);

  return (
    <>
      <LoadingBar color="#0d6efd" ref={loadingRef} />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Public />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/signup" element={<Public />}>
            <Route index element={<Register />} />
          </Route>
          <Route path="/dashboard" element={<Private />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="*" element={<>404 Not Found</>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default withCookies(App);
