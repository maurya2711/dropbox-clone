import React, { Fragment } from "react";
import useFetch from "../../hooks/useFetch";
import InputBox from "../UI Elements/InputBox";
import notify from "../../utility/globals/notify";
import useMutation from "../../hooks/useSwrMutation";
import DragAndDrop from "../UI Elements/DragAndDrop";
import fileUploadForm from "../Forms/fileUploadForm.json";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, FormLabel, Button } from "@mui/material";
import { GLOBALS } from "../../utility/globals/constants";
import { FileSchema } from "../../utility/schema/FileSchema";
import { actions, AuthContext } from "../../contexts/authContext";

const UploadFile = (props) => {
  const { setOpenEditForm, selectedId, setSelectedId } = props;
  const { state, dispatch } = React.useContext(AuthContext);
  const { user, isLoading } = state;

  const { trigger: uploadTrigger } = useMutation(
    GLOBALS.API.UPLOAD_FILE,
    "POST"
  );
  const { trigger: updateTrigger } = useMutation(
    `${GLOBALS.API.UPDATE_FILE}/${user?._id}`,
    "PUT"
  );

  // form hook
  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    reValidateMode: "onBlur",
    resolver: yupResolver(FileSchema),
  });

  // initial value
  React.useEffect(() => {
    if (state?.user?._id) {
      reset({ user_id: state?.user?._id });
    }
  }, [state]);

  // fetch uploaded list
  const [hitCall, setHitCall] = React.useState(false);
  const { data } = useFetch(GLOBALS.API.FILES, hitCall, "GET");
  const newData = data?.data;
  React.useEffect(() => {
    if (newData?.length > 0) {
      dispatch({ type: actions.UPLOADED_FILES, payload: newData });
      setHitCall(null);
      setOpenEditForm(false);
    }
  }, [newData]);

  // form submit event
  const beforeSubmit = async (formValues) => {
    let res;
    if (!formValues?.file) {
      return setError("file", {
        type: "required",
        message: "This field is required",
      });
    }

    dispatch({ type: actions.LOADING_STATUS, payload: true });
    const formData = new FormData();
    formData.append("file", formValues?.file?.[0]);

    if (selectedId?.id) {
      // handle update
      formData.append("id", selectedId?.id);
      res = await updateTrigger(formData);
      setSelectedId(null);
    } else {
      // handle new upload
      formData.append("user_id", formValues?.user_id);
      res = await uploadTrigger(formData);
    }

    const { data, status } = res;
    if (status >= 200 && status <= 201) {
      notify(data?.message);
    } else {
      notify(data, "danger");
    }

    reset();
    setHitCall(user?._id);
    setOpenEditForm(false);
    dispatch({ type: actions.LOADING_STATUS, payload: false });
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit(beforeSubmit)}>
      <div>
        {fileUploadForm.map((item) => (
          <Fragment key={item?.name}>
            <FormLabel
              variant="subtitle1"
              error={errors?.[item?.name]?.message}
            >
              {item?.label}
            </FormLabel>
            <div>
              {item?.element === "file" ? (
                <DragAndDrop
                  isRequired={item?.isRequired}
                  setValue={setValue}
                  control={control}
                  name={item?.name}
                  errors={errors?.[item?.name]?.message}
                />
              ) : (
                <InputBox
                  label={null}
                  name={item?.name}
                  inputType={item?.type}
                  control={control}
                  errors={errors?.[item?.name]?.message}
                />
              )}
            </div>
          </Fragment>
        ))}
      </div>
      <LoadingButton
        loading={isLoading}
        type="submit"
        fullWidth
        variant="outlined"
        sx={{ mb: 2, py: 2 }}
      >
        Upload
      </LoadingButton>
    </Box>
  );
};

export default React.memo(UploadFile);
