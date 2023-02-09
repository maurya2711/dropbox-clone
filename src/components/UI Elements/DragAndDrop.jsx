import React from "react";
import Dropzone from "react-dropzone";
import { withStyles } from "@mui/styles";
import { Controller } from "react-hook-form";
import { Box, FormControl, FormHelperText, Typography } from "@mui/material";

const styles = (theme) => ({
  dropzone: {
    margin: "10px 0",
    width: "100%",
    border: "1px dashed #ccc",
    padding: theme.spacing(5),
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#eee",
    },
  },
  input: {
    display: "none",
  },
  fileName: {
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
});

const DragAndDrop = ({ classes, ...props }) => {
  const { errors, control, setValue } = { ...props };
  return (
    <FormControl error={Boolean(errors)} sx={{ width: "100%" }}>
      <Controller
        control={control}
        name="file"
        rules={{
          required: { value: true, message: "This field is required" },
        }}
        render={({ field: { onChange, onBlur } }) => (
          <Dropzone
            maxFiles={1}
            onDrop={(acceptedFiles) => {
              setValue("file", acceptedFiles, {
                shouldValidate: true,
              });
            }}
          >
            {({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => (
              <Box className={classes.dropzone} {...getRootProps()}>
                <input
                  {...getInputProps({
                    id: "spreadsheet",
                    onChange,
                    onBlur,
                  })}
                  className={classes.input}
                />
                {acceptedFiles.length > 0 ? (
                  <div className={classes.fileName}>
                    {acceptedFiles[0].name}
                  </div>
                ) : (
                  <Typography variant="h5" textAlign={"center"}>
                    No file selected
                  </Typography>
                )}
              </Box>
            )}
          </Dropzone>
        )}
      />
      {errors && (
        <FormHelperText error={true} sx={{ ml: 0, mt: 1 }}>
          {errors}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default withStyles(styles)(DragAndDrop);
