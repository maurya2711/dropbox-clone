import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import UploadFile from "../components/extras/uploadFile";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableListing from "../components/extras/TableListing";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { removeCookie } from "../utility/globals/functions";
import { actions, AuthContext } from "../contexts/authContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Drawer } from "../components/extras/dashboard.config";
import {
  Box,
  List,
  Grid,
  Paper,
  Toolbar,
  Divider,
  Container,
  IconButton,
  Typography,
  CssBaseline,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditUpload from "../components/extras/EditUpload";

const mdTheme = createTheme();

function DashboardContent() {
  const { dispatch } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // logout handler
  const handleLogout = () => {
    removeCookie("token");
    removeCookie("userEmail");
    removeCookie("userName");
    removeCookie("id");
    dispatch({ type: actions.LOGOUT_SUCCESS });
  };

  const [openEditForm, setOpenEditForm] = React.useState(false);
  const handleDialogEvent = () => {
    setOpenEditForm(false);
  };
  return (
    <>
      <EditUpload
        {...{
          openEditForm,
          setOpenEditForm,
          handleDialogEvent,
        }}
      />
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar sx={{ pr: "24px" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <Link to="/dashboard">
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </Link>
              <Divider sx={{ my: 1 }} />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {/* <UploadFile /> */}
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => setOpenEditForm(true)}
                  >
                    Upload a file
                  </Button>
                  <Grid item xs={12} my={2}>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      <Typography variant="subtitle1">
                        Uploaded Files
                      </Typography>
                      <TableListing />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
