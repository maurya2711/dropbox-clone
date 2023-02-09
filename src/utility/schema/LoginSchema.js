import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("This field is required"),
  password: yup.string().required("This field is required"),
});
