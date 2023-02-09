import React from "react";
import { AuthContext } from "../contexts/authContext";
import { Outlet, useNavigate } from "react-router-dom";
import { CssBaseline, Grid, Paper } from "@mui/material";

const Public = () => {
  const navigate = useNavigate();
  const { state } = React.useContext(AuthContext);
  const { isAuthenticated } = state;
  // check user auth
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Public;
