import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const DialogBox = (props) => {
  const {
    open,
    handleClose,
    dialogTitle,
    bodyChildren,
    footerChildren,
    fullScreen,
  } = {
    ...props,
  };
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {dialogTitle && (
          <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>
        )}
        <DialogContent>{bodyChildren}</DialogContent>
        {footerChildren && <DialogActions>{footerChildren}</DialogActions>}
      </Dialog>
    </>
  );
};

DialogBox.defaultProps = {
  open: false,
  handleClose: () => {},
  dialogTitle: "",
  bodyChildren: {},
  footerChildren: null,
  fullScreen: false,
};

export default DialogBox;
