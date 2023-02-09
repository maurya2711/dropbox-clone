import React, { Fragment } from "react";
import InputBox from "../UI Elements/InputBox";
import notify from "../../utility/globals/notify";
import useMutation from "../../hooks/useSwrMutation";
import DragAndDrop from "../UI Elements/DragAndDrop";
import fileUploadForm from "../Forms/fileUploadForm.json";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GLOBALS } from "../../utility/globals/constants";
import { FileSchema } from "../../utility/schema/FileSchema";
import { Box, FormLabel, Button } from "@mui/material";
import { actions, AuthContext } from "../../contexts/authContext";
import useFetch from "../../hooks/useFetch";

const UploadFile = (props) => {
  const { openEditForm, setOpenEditForm, selectedId, setSelectedId } = props;
  const { state, dispatch } = React.useContext(AuthContext);
  const { user } = state;

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
  const { data } = useFetch(`${GLOBALS.API.FILES}${hitCall}`, "GET");
  const newData = data && data?.data?.data;
  React.useEffect(() => {
    if (newData?.length > 0) {
      dispatch({ type: actions.UPLOADED_FILES, payload: newData });
      setHitCall(null);
    }
  }, [newData]);

  // form submit event
  const beforeSubmit = async (formValues) => {
    if (!formValues?.file) {
      return setError("file", {
        type: "required",
        message: "This field is required",
      });
    }
    dispatch({ type: actions.LOADING_STATUS, payload: true });
    const formData = new FormData();
    formData.append("file", formValues?.file?.[0]);
    if (openEditForm) {
      // handle update
      formData.append("id", selectedId?.id);
      const res = await updateTrigger(formData);
      const { data, status } = res;
      if (status >= 200 && status <= 201) {
        notify(data?.message);
      } else {
        notify(data, "danger");
      }
      setOpenEditForm();
      setSelectedId(null);
    } else {
      // handle new upload
      formData.append("user_id", formValues?.user_id);
      const res = await uploadTrigger(formData);
      const { data, status } = res;
      if (status >= 200 && status <= 201) {
        notify(data?.message);
      } else {
        notify(data, "danger");
      }
    }
    setHitCall(user?._id);
    reset();
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
      <Button type="submit" variant="outlined" size="large" sx={{ mb: 2 }}>
        Upload
      </Button>
    </Box>
  );
};

export default React.memo(UploadFile);
