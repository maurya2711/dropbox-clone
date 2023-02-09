import React from "react";
import DataRow from "./DataRow";
import DeleteItem from "./DeleteItem";
import EditUpload from "./EditUpload";
import Table from "@mui/material/Table";
import useFetch from "../../hooks/useFetch";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import { Typography } from "@mui/material";
import { actions, AuthContext } from "../../contexts/authContext";
import { GLOBALS } from "../../utility/globals/constants";

const headers = ["No.", "File", "Uploaded On", "Actions"];
export default function TableListing() {
  const { state, dispatch } = React.useContext(AuthContext);
  const { user, uploadedFiles } = state;

  // fetch uploaded list
  const { data, error, isLoading } = useFetch(
    `${GLOBALS.API.FILES}${user?._id}`,
    "GET"
  );

  const newData = data && data?.data?.data;
  React.useEffect(() => {
    if (newData?.length > 0) {
      dispatch({ type: actions.UPLOADED_FILES, payload: newData });
    }
  }, [newData]);

  // confirm deletion
  const [openDialogValue, setOpenDialogValue] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState({
    id: null,
    type: null,
  });

  // confirm edit form
  const [openEditForm, setOpenEditForm] = React.useState(null);
  const handleDialogEvent = () => {
    setOpenDialogValue(null);
    setOpenEditForm(null);
  };

  if (isLoading) return <>Loading...</>;
  if (error) return <>Something went wrong...</>;
  return (
    <>
      <DeleteItem
        {...{
          openDialogValue,
          setOpenDialogValue,
          selectedId,
          setSelectedId,
          handleDialogEvent,
        }}
      />
      <EditUpload
        {...{
          openEditForm,
          setOpenEditForm,
          selectedId,
          setSelectedId,
          handleDialogEvent,
        }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {uploadedFiles?.length > 0
                ? headers.map((el) => <TableCell key={el}>{el}</TableCell>)
                : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {uploadedFiles?.length > 0 ? (
              uploadedFiles?.map((row, index) => (
                <DataRow
                  key={row?._id}
                  {...{
                    row,
                    index,
                    setOpenDialogValue,
                    setSelectedId,
                    setOpenEditForm,
                  }}
                />
              ))
            ) : (
              <Typography
                sx={{
                  background: "#efefef",
                  border: "1px solid #ddd",
                  padding: "1rem",
                  color: "#d32f2f",
                  my: 1,
                  fontSize: "14px",
                }}
              >
                No Files Uploaded
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
