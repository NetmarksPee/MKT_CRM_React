import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";
//import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

//import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import EditNoteIcon from "@mui/icons-material/EditNote";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TitleIcon from "@mui/icons-material/Title";

//import 'bootstrap/dist/css/bootstrap.min.css'
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import axios from "axios";
import Box from "@mui/material/Box";

import { format } from "date-fns";
import PopupConfirm, { PopUpType } from "../../Shares/PopupConfirm";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import { Paper, Slide, Backdrop } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";

import { stylePopUpConfirm } from "../../Shares/StyleControl";

// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
//}

function BasicBreadcrumbs() {
  const curr_page_name = "USER GROUP PERMISSION";

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          <HomeIcon />
        </Link>
        {/* <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link> */}
        <Typography color="text.primary">{curr_page_name}</Typography>
      </Breadcrumbs>
      <Typography gutterBottom sx={{ fontWeight: "700" }}>
        {curr_page_name}
      </Typography>
    </div>
  );
}

const StatusEnum = {
  A: "Active",
  I: "Inactive",
};

const FlagEnum = {
  1: "Text",
  2: "Check",
};

export default function UserGrouppermission() {
  const [selData, setData] = useState({
    user_group_code: 0,
    user_group_name: "",
    user_group_description: "",
    status: 0,
    create_date: new Date(),
    create_by: "Admin",
    update_date: new Date(),
    update_by: "",
    scrmode: "new",
  });

  const navigate = useNavigate();
  const { Popup } = PopupConfirm(false);

  const callApi = async () => {
    const apiUrl = import.meta.env.VITE_CRM_API_URL + "usergroups";
    const res = await axios.get(apiUrl);
    const data_format = await res.data;

    setUserGroup(data_format);
  };

  useEffect(() => {
    callApi();
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const us: unknown[] | (() => unknown[]) = [];
  const [rows2, setUserGroup] = useState(us);

  async function Delete(data) {
    setData(data);
    await handleOpen();
    console.log("OK");
  }

  async function handlerDelete() {
    const apiUrl = import.meta.env.VITE_CRM_API_URL + "remove";

    const response = await axios.post(apiUrl, selData);
    console.log("Response:", response.data);

    await handleClose();

    callApi();
  }

  const columns: GridColDef<(typeof rows2)[number]>[] = [
    { field: "user_group_code", headerName: "ID", width: 80 },
    {
      field: "user_group_name",
      headerName: "Name",
      width: 130,
      editable: false,
    },
    {
      field: "user_group_description",
      headerName: "Description",
      width: 250,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      width: 100,
      align: "center",
      editable: false,
      renderCell: (params) => DispStatus(params.row),
    },
    {
      field: "create",
      headerName: "Created",
      headerAlign: "center",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      align: "center",
      width: 150,
      renderCell: (params) => CreateDisp(params.row),
      //valueGetter: (value, row) => `${row.create_date || ''} \n ${row.create_by || ''}`,
    },
    {
      field: "update",
      headerName: "Updated",
      headerAlign: "center",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      align: "center",
      width: 150,
      renderCell: (params) => UpdateDisp(params.row),
      // valueGetter: (value, row2) => `${row2.update_date || ''} ${row2.update_by || ''}`,
    },

    {
      field: "Action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      width: 120,
      renderCell: (params) => buttonModel(params.row),
    },
  ];

  const rowStyle = `
  .MuiDataGrid-row {
    border-bottom: none;
  }
`;

  const handleEdit = (row) => {
    const parameterValue = {
      name: row.user_group_name,
      id: row.user_group_code,
      description: row.user_group_description,
      status: row.status,
      scrmode: "edit",
      create_date: row.create_date,
      create_by: row.create_by,
      update_date: row.update_date,
      update_by: row.update_by,
    };

    // setData2(row);
    // handleOpen();
    navigate("/EditUserPermission", { state: { parameterValue } });
  };

  function DispStatus(row) {
    const statusLabel = StatusEnum[row.status];
    const ChipColor = statusLabel === "Active" ? "info" : "default";

    return (
      <Chip label={statusLabel} color={ChipColor} sx={{ width: "70px" }} />
    );
  }

  function DispFlag(row) {
    const FlagLabel = FlagEnum[row.type];

    if (row.type === 1) {
      return (
        <span>
          <TitleIcon />
        </span>
      );
    } else {
      return (
        <span>
          <CheckBoxIcon />
        </span>
      );
    }
  }

  function DispID(row) {
    return <Chip size="small" label={row.id} color="secondary" />;
  }

  function CreateDisp(row) {
    return (
      <div>
        <Typography sx={{ fontSize: "12px", textAlign: "center" }}>
          {format(row.create_date, "dd/MM/yyyy HH:mm")} <br />
          {row.create_by}
        </Typography>
      </div>
    );
  }

  function UpdateDisp(row) {
    if (row.update_by === null) {
      return <div>-</div>;
    } else {
      return (
        <div>
          <Typography sx={{ fontSize: "12px", textAlign: "center" }}>
            {format(row.update_date, "dd/MM/yyyy HH:mm")} <br />
            {row.update_by}
          </Typography>
        </div>
      );
    }
  }

  function buttonModel(row) {
    return (
      <div>
        <IconButton
          onClick={() => handleEdit(row)}
          aria-label="EditIcon"
          sx={{ color: "gold" }}
        >
          <EditNoteIcon />
        </IconButton>
      </div>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <BasicBreadcrumbs />
        <Paper sx={{ borderRadius: 5 }}>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1 } }}
            autoComplete="off"
          >
            <Stack sx={{ m: 1 }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={1} lg={1} sx={{ justifyContent: 'flex-start', mt:2, mb:1 }}>
                                  <ComboRowPage  />
                              </Grid> */}
                <Grid
                  item
                  xs={12}
                  lg={12}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                    mb: 1,
                  }}
                >
                  {/* <ChildComponent onSelectChange={handleSelectChange} message="Hello from Parent" /> */}
                </Grid>
              </Grid>

              <div>
                {/* Apply the styles using a style tag */}
                <style>{rowStyle}</style>
                {/* Render the DataGrid component */}
                <TransitionGroup>
                  <DataGrid
                    sx={{ mt: 1, mb: 1 }}
                    rows={rows2}
                    columns={columns}
                    getRowId={(row: any) => row.user_group_code}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 8,
                        },
                      },
                    }}
                    pageSizeOptions={[8, 10, 20, 30]}
                    disableRowSelectionOnClick
                  />
                </TransitionGroup>
              </div>
            </Stack>

            <Modal
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <Box sx={stylePopUpConfirm}>
                  <Popup
                    TypePopUp={PopUpType.Delete}
                    onClickOK={handlerDelete}
                    onClickCancel={handleClose}
                  />
                </Box>
              </Slide>
            </Modal>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
