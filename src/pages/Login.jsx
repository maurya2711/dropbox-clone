import React from "react";
import notify from "../utility/globals/notify";
import useMutation from "../hooks/useSwrMutation";
import LoadingButton from "@mui/lab/LoadingButton";
import InputBox from "../components/UI Elements/InputBox";
import loginForm from "../components/Forms/loginForm.json";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { actions } from "../contexts/authContext";
import { AuthContext } from "../contexts/authContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { GLOBALS } from "../utility/globals/constants";
import { setCookie } from "../utility/globals/functions";
import { LoginSchema } from "../utility/schema/LoginSchema";
import { Box, Grid, Avatar, Typography } from "@mui/material";

function Login() {
  const { trigger: loginTrigger } = useMutation(GLOBALS.API.LOGIN, "POST");

  const { state, dispatch } = React.useContext(AuthContext);
  const { isLoading } = state;

  // form hook
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    reValidateMode: "onBlur",
    resolver: yupResolver(LoginSchema),
  });

  // form submit event
  const beforeSubmit = async (formValues) => {
    dispatch({ type: actions.LOADING_STATUS, payload: true });
    const res = await loginTrigger(formValues);
    const { data, status } = res;
    if (status >= 200 && status <= 201) {
      const { firstName, lastName, email, token, _id } = data?.user;
      const userData = { name: `${firstName} ${lastName}`, email, _id };
      dispatch({ type: actions.LOGIN_SUCCESS, payload: userData });
      setCookie("token", token);
      setCookie("userEmail", email);
      setCookie("userName", `${firstName} ${lastName}`);
      setCookie("id", _id);
    } else {
      notify(data, "danger");
    }
    dispatch({ type: actions.LOADING_STATUS, payload: false });
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(beforeSubmit)}
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      {loginForm.map(({ label, name, type, placeholder }) => (
        <InputBox
          key={label}
          label={label}
          name={name}
          inputType={type}
          control={control}
          errors={errors?.[name]?.message}
          placeholder={placeholder}
        />
      ))}
      <LoadingButton
        loading={isLoading}
        type="submit"
        fullWidth
        variant="outlined"
        sx={{ mt: 3, mb: 2, py: 2 }}
      >
        Sign In
      </LoadingButton>
      <Grid container>
        <Grid item>
          <Link to="/signup">
            <Typography variant="body2" display="block" gutterBottom>
              {"Don't have an account? Sign Up"}
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
