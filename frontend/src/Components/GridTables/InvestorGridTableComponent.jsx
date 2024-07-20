import { useState, useEffect, useRef } from "react";
import { Container, Tooltip, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import EditToolbar from "../EditToolbar";
import Loading from "../LoadingComponent";

import useMachineMaster from "../../utils/MachineMaster";

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = useState([]);
  const firstUpdate = useRef(true);
  const [options, setOptions] = useState({
    directions: [],
    actions: [],
    signals: [],
  });
  const [rowModesModel, setRowModesModel] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [addDisabled, setAddDisabled] = useState(false);
  const [rowCountState, setRowCountState] = useState(0);
  const [updateKey, setUpdateKey] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const { get, write, remove, loading } = useMachineMaster();

  useEffect(() => {
    const getData = async () => {
      setAddDisabled(true);

      let get_options = false;
      if (firstUpdate.current) {
        firstUpdate.current = false;
        get_options = true;
      }

      setLoadingMessage("Retriving data...");
      const response = await get(
        paginationModel?.page ?? 0,
        paginationModel?.pageSize ?? 10,
        get_options
      );
      setRows(response?.data?.data ?? []);
      setRowCountState(response?.data?.meta?.count ?? 0);

      if (get_options)
        setOptions(
          response?.data?.meta?.options ?? {
            directions: [],
            actions: [],
            signals: [],
          }
        );

      setAddDisabled(false);
    };

    getData();
  }, [paginationModel, updateKey]);

  const getRowId = (row) => row.uuid;

  const handleRowEditStart = (params, event) => {
    console.log("edit start");
    setAddDisabled(true);
  };

  const handleRowEditStop = (params, event) => {
    console.log("edit stop");
    setAddDisabled(false);
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (uuid) => () => {
    console.log("edit click");
    console.log(rows);

    setAddDisabled(true);

    setRowModesModel({ ...rowModesModel, [uuid]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (uuid) => () => {
    setAddDisabled(false);
    setRowModesModel({ ...rowModesModel, [uuid]: { mode: GridRowModes.View } });
    console.log(rowModesModel);
  };

  const handleDeleteClick = (uuid) => async () => {
    // DELETE OPERATION

    const option = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (option === false) return false;

    setLoadingMessage("Deleting Record...");
    const response = await remove(uuid);
    alert(`DELETE ${uuid}. STATUS: ${response.code}`);

    setUpdateKey(new Date());
  };

  const handleCancelClick = (uuid) => () => {
    setAddDisabled(false);

    setRowModesModel({
      ...rowModesModel,
      [uuid]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.uuid === uuid);
    if (editedRow.isNew) {
      console.log("cancel click, edited row is new");
      setRows(rows.filter((row) => row.uuid !== uuid));
    }
  };

  const handleCopyClick = (uuid) => async () => {
    try {
      let row = rows.filter((row) => row.uuid === uuid)[0];
      await navigator.clipboard.writeText(`${row?.name} - ${uuid}`);
      console.log(rows);
      alert("Row ID copied");
    } catch (err) {
      alert("Error in copying row ID");
    }
  };

  const processRowUpdate = async (newRow) => {
    // UPDATE AND CREATE NEW OBJECT

    const updatedRow = { ...newRow, isNew: false };

    if (newRow.isNew === true) {
      delete newRow.uuid;
      setLoadingMessage("Inserting new record...");
    } else {
      setLoadingMessage("Updating record...");
    }

    let isNew = newRow.isNew;
    delete newRow.isNew;

    const response = await write(newRow, isNew);

    // Remove the alert and add a toast message.
    alert(`UPSERT STATUS: ${response.code}.`);
    setUpdateKey(new Date());

    return updatedRow;
  };

  const processRowUpdateError = async (error) => {
    console.log(error);
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    // newRowModesModel seems to be empty dict
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
      disableColumnMenu: true,
      type: "string",
    },
    {
      field: "code",
      headerName: "Code",
      width: 75,
      editable: true,
      disableColumnMenu: true,
      type: "string",
    },
    {
      field: "ingredient",
      headerName: "Ingredient",
      width: 200,
      editable: true,
      disableColumnMenu: true,
      type: "string",
    },
    {
      field: "signal",
      headerName: "Signal",
      width: 120,
      editable: true,
      disableColumnMenu: true,
      type: "singleSelect",
      valueOptions: options?.signals ?? [],
    },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      editable: true,
      disableColumnMenu: true,
      type: "singleSelect",
      valueOptions: options?.actions ?? [],
    },
    {
      field: "directions",
      headerName: "Directions",
      width: 200,
      editable: true,
      disableColumnMenu: true,
      type: "singleSelect",
      valueOptions: options?.directions ?? [],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Tooltip title={"Save changes"}>
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
                onClick={handleSaveClick(id)}
              />
            </Tooltip>,
            <Tooltip title={"Cancel edit"}>
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />
            </Tooltip>,
          ];
        }

        return [
          <Tooltip title={"Edit record"}>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              disabled={addDisabled}
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />
          </Tooltip>,
          <Tooltip title={"Delete record"}>
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />
          </Tooltip>,
          <Tooltip title={"Copy row ID"}>
            <GridActionsCellItem
              icon={<ContentCopyIcon />}
              label="Copy row ID"
              onClick={handleCopyClick(id)}
              color="inherit"
            />
          </Tooltip>,
        ];
      },
    },
  ];

  return (
    <Container
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      {/* <Typography variant="h4" sx={{ mt: 3, mb: 4 }}>
        Machine Master
      </Typography> */}

      <DataGrid
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
        rows={rows}
        columns={columns}
        editMode="row"
        getRowId={getRowId}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={processRowUpdateError}
        slots={{
          toolbar: EditToolbar,
          loadingOverlay: Loading,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, addDisabled, setAddDisabled },
          loadingOverlay: { loadingMessage },
        }}
        rowCount={rowCountState}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </Container>
  );
}
