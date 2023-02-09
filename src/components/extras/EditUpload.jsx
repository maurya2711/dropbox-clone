import React from "react";
import DialogBox from "../UI Elements/DialogBox";
import UploadFile from "./uploadFile";

const EditUpload = (props) => {
  const { openEditForm, handleDialogEvent } = props;
  return (
    <DialogBox
      open={openEditForm}
      handleClose={handleDialogEvent}
      bodyChildren={<UploadFile {...props} />}
    />
  );
};

export default EditUpload;
