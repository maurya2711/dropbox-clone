import React from "react";
import DialogBox from "../UI Elements/DialogBox";
import notify from "../../utility/globals/notify";
import useMutation from "../../hooks/useSwrMutation";
import { Button, Typography } from "@mui/material";
import { GLOBALS } from "../../utility/globals/constants";
import { actions, AuthContext } from "../../contexts/authContext";
import useFetch from "../../hooks/useFetch";

const DeleteItem = (props) => {
  const {
    openDialogValue,
    setOpenDialogValue,
    selectedId,
    setSelectedId,
    handleDialogEvent,
  } = props;
  const { state, dispatch } = React.useContext(AuthContext);
  const { user } = state;

  // fetch uploaded list
  const [hitCall, setHitCall] = React.useState(false);
  const { data } = useFetch(GLOBALS.API.FILES, hitCall, "GET");
  const newData = data?.data;
  React.useEffect(() => {
    dispatch({ type: actions.UPLOADED_FILES, payload: newData });
    setHitCall(false);
  }, [newData]);

  const { trigger: deleteTrigger } = useMutation(
    selectedId?.type === "delete"
      ? `${GLOBALS.API.DELETE_FILE}/${user?._id}/${selectedId?.id}`
      : null,
    "DELETE"
  );
  // delete handler
  const deleteTopicEvent = async () => {
    dispatch({ type: actions.LOADING_STATUS, payload: true });
    if (openDialogValue) {
      const res = await deleteTrigger();
      const { data, status } = res;
      if (status >= 200 && status <= 201) {
        notify(data?.message, "info");
        setOpenDialogValue(false);
        setSelectedId(null);
      }
    }
    setHitCall(user?._id);
    dispatch({ type: actions.LOADING_STATUS, payload: false });
  };
  return (
    <DialogBox
      open={openDialogValue}
      handleClose={handleDialogEvent}
      bodyChildren={
        <Typography>Are you sure you want to delete this?</Typography>
      }
      footerChildren={
        <>
          <Button variant="outlined" onClick={deleteTopicEvent}>
            Yes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDialogEvent}
          >
            Cancel
          </Button>
        </>
      }
    />
  );
};

export default React.memo(DeleteItem);
