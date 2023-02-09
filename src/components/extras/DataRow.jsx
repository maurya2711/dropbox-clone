import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GLOBALS } from "../../utility/globals/constants";
import { IconButton, ImageListItem, Typography } from "@mui/material";
import {
  getFileType,
  convertTimeStampToDateFormat,
} from "../../utility/globals/functions";

const DataRow = ({
  index,
  row,
  setOpenDialogValue,
  setOpenEditForm,
  setSelectedId,
}) => {
  const type = getFileType(row?.fileName, GLOBALS.ALLOWED_FORMATS);
  return (
    <TableRow
      key={row?._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell>
        <div>
          {type == "PHOTO" && (
            <ImageListItem sx={{ width: "4rem" }}>
              <img src={row?.file} alt={row?.fileName} loading="lazy" />
            </ImageListItem>
          )}
          <Typography mt={2} variant="subtitle2">
            {row?.fileName}
          </Typography>
        </div>
      </TableCell>
      <TableCell>
        {convertTimeStampToDateFormat(row?.createdAt, "DD MMM YYYY HH:MM")}
      </TableCell>
      <TableCell>
        <IconButton
          aria-label="edit"
          onClick={() => {
            setOpenEditForm(true);
            setSelectedId({ id: row?._id, type: "edit" });
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => {
            setOpenDialogValue(true);
            setSelectedId({ id: row?._id, type: "delete" });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default React.memo(DataRow);
