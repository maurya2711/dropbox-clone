import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const InputBox = (props) => {
  const {
    name,
    inputType,
    label,
    placeholder,
    handleChange,
    rules,
    control,
    errors,
  } = {
    ...props,
  };
  return (
    <>
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field: { onChange, onBlur, value = "" } }) => {
          return (
            <TextField
              error={errors ? true : false}
              variant={inputType === "hidden" ? "filled" : "outlined"}
              id={name}
              type={inputType}
              label={label || placeholder}
              placeholder={placeholder}
              onChange={(e) => {
                handleChange(e);
                onChange(e);
              }}
              value={value}
              onBlur={onBlur}
              className={errors && "showerror"}
              margin="normal"
              fullWidth={inputType !== "hidden"}
              helperText={errors}
            />
          );
        }}
      />
    </>
  );
};

InputBox.defaultProps = {
  name: "",
  inputType: "",
  label: "",
  placeholder: "",
  handleChange: () => {},
  rules: {},
  control: {},
  errors: "",
};

export default InputBox;
