import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";

export default function EditToolbar(props) {
  const { setRows, setRowModesModel, addDisabled, setAddDisabled } = props;

  const randomId = () => Math.floor(Math.random() * 1000);

  const handleClick = () => {
    setAddDisabled(true);

    const uuid = "auto generated";
    setRows((oldRows) => [
      ...oldRows,
      {
        uuid,
        center_code: "",
        branch_name: "",
        ifsc: "",
        center_incharge: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [uuid]: { mode: GridRowModes.Edit, fieldToFocus: "center_code" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
        disabled={addDisabled}
      >
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
