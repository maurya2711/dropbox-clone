import React from "react";
import notify from "../utility/globals/notify";
import useMutation from "../hooks/useSwrMutation";
import LoadingButton from "@mui/lab/LoadingButton";
import InputBox from "../components/UI Elements/InputBox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import registerForm from "../components/Forms/registerForm.json";
import { useForm } from "react-hook-form";
import { actions } from "../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { GLOBALS } from "../utility/globals/constants";
import { Box, Grid, Avatar, Typography } from "@mui/material";
import { RegisterSchema } from "../utility/schema/RegisterSchema";

const Register = () => {
  const navigate = useNavigate();
  const { trigger: registerTrigger } = useMutation(
    GLOBALS.API.REGISTER,
    "POST"
  );

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
    resolver: yupResolver(RegisterSchema),
  });

  // form submit event
  const beforeSubmit = async (formValues) => {
    dispatch({ type: actions.LOADING_STATUS, payload: true });
    const res = await registerTrigger(formValues);
    const { data, status } = res;
    if (status >= 200 && status <= 201) {
      notify(data?.message);
      const timer = setTimeout(() => {
        navigate("/");
        clearTimeout(timer);
      }, 1000);
    } else {
      notify(data?.message, "danger");
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
        Sign Up
      </Typography>
      {registerForm.map((item) => (
        <InputBox
          key={item?.label}
          label={item?.label}
          name={item?.name}
          inputType={item?.type}
          control={control}
          errors={errors?.[item?.name]?.message}
          placeholder={item?.placeholder}
        />
      ))}
      <LoadingButton
        loading={isLoading}
        type="submit"
        fullWidth
        variant="outlined"
        sx={{ mt: 3, mb: 2, py: 2 }}
      >
        Sign Up
      </LoadingButton>
      <Grid container>
        <Grid item>
          <Link to="/">
            <Typography variant="body2" display="block" gutterBottom>
              {"Already have an account? Sign In"}
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
