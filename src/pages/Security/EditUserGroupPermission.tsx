import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import {
  Container,
  CssBaseline,
  Paper,
  Slide,
  Backdrop,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

//import { GridAddIcon } from "@mui/x-data-grid";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
//import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useForm } from "react-hook-form";

import moment from "moment";

import { stylePopUpConfirm } from "../../Shares/StyleControl";
import { TransitionGroup } from "react-transition-group";
import { STATUS_CODES } from "http";

export type Root = IResponseUserGroupPermission[];

export interface IResponseUserGroupPermission {
  user_group_permission_code?: number;
  user_group_code?: string;
  menu_code: string;
  name: string;
  view_flag?: number;
  create_flag?: number;
  update_flag?: number;
  export_flag?: number;
  create_date?: string;
  create_by?: string;
  update_date?: string;
  update_by?: string;
}

type CheckboxPermission = {
  fieldFlag: number;
  menuCode: string;
  type: "view_flag" | "create_flag" | "export_flag" | "update_flag";
};

const EditUserGroupPermission = () => {
  const location = useLocation();
  const { parameterValue } = location.state;
  const [userGroup, setUserGroup] = useState<Root>([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const callApi = async () => {
    try {
      const apiUrl =
        import.meta.env.VITE_CRM_API_URL + "userpermisson/" + parameterValue.id;
      const response = await axios.get<Root>(apiUrl);
      setUserGroup(response.data);
    } catch (error) {
      console.log("error =>", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  function BasicBreadcrumbs() {
    const scrPrefixName = "EDIT";

    const curr_page_name = scrPrefixName + " USER GROUP PERMISSION";

    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            <HomeIcon />
          </Link>
          <Link underline="hover" color="inherit" href="./UserPermission">
            USER GROUP PERMISSION LIST
          </Link>
          <Typography color="text.primary">{curr_page_name}</Typography>
        </Breadcrumbs>

        <Typography gutterBottom sx={{ fontWeight: "700" }}>
          {curr_page_name}
        </Typography>
      </div>
    );
  }

  const onSubmit = async () => {
    // const ret =  JSON.stringify(data)
    // alert(ret);
    await Delete(parameterValue.id);
    await add(userGroup);
    navigate("/UserPermission");
  };

  async function add(data: Root) {
    const apiUrl = import.meta.env.VITE_CRM_API_URL + "userpermisson/insert";
    data.forEach((r) => {
      console.log(r);
      if (r.view_flag === null) {
        r.view_flag = 0;
      }
      if (r.create_flag === null) {
        r.create_flag = 0;
      }
      if (r.update_flag === null) {
        r.update_flag = 0;
      }
      if (r.export_flag === null) {
        r.export_flag = 0;
      }
      if (r.user_group_code === null) {
        r.user_group_code = parameterValue.id;
      }
      if (r.create_by === null) {
        r.create_by = "ADMIN";
      }
      if (r.update_by === null) {
        r.update_by = "ADMIN";
      }

      const response = axios.post(apiUrl, r, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log("Response:", response);
    });

    // const updatedObject = rows2.map((item) =>
    //   item.id === data.id ? data : item
    // );
  }

  async function Delete(data: number) {
    const apiUrl = import.meta.env.VITE_CRM_API_URL + "userpermisson/delete";

    const response = await axios.post(
      apiUrl,
      { user_group_code: data },
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log("Response:", response.data);

    // const updatedObject = rows2.map((item) =>
    //   item.id === data.id ? data : item
    // );
  }

  const navigate = useNavigate();

  const saveButton = () => {
    return (
      <Button
        color="success"
        //type="submit"
        variant="contained"
        sx={{ width: "100px", borderRadius: 50 }}
        onClick={onSubmit}
      >
        Save
      </Button>
    );
  };

  const rowStyle = `
  .MuiDataGrid-row {
    border-bottom: none;
  }
`;

  useEffect(() => {
    console.log("userGroup", userGroup);
  }, [JSON.stringify(userGroup)]);

  const ViewCheckbox = (viewCheckboxProps: CheckboxPermission) => {
    return (
      <Checkbox
        key={viewCheckboxProps.menuCode}
        checked={Boolean(viewCheckboxProps.fieldFlag)}
        name="View"
        onChange={(e) => {
          const rawUserGroup = userGroup.find(
            (group) => group.menu_code === viewCheckboxProps.menuCode
          );

          const cloneRawUserGroup = {
            ...rawUserGroup,
            [viewCheckboxProps.type]: Number(e.target.checked),
          } as IResponseUserGroupPermission;

          setUserGroup((prev) => {
            return prev.map((item) => {
              if (item.menu_code === viewCheckboxProps.menuCode) {
                return cloneRawUserGroup;
              }

              return item;
            });
          });
        }}
      />
    );
  };

  const columnProps: GridColDef<IResponseUserGroupPermission>[] = [
    { field: "name", headerName: "Menu", width: 250 },
    {
      field: "view_flag",
      headerName: "View",
      width: 120,
      editable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <ViewCheckbox
            fieldFlag={params.row.view_flag ?? 0}
            menuCode={params.row.menu_code}
            type="view_flag"
          />
        );
      },
    },
    {
      field: "create_flag",
      headerName: "Create",
      width: 120,
      editable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <ViewCheckbox
            fieldFlag={params.row.create_flag ?? 0}
            menuCode={params.row.menu_code}
            type="create_flag"
          />
        );
      },
    },
    {
      field: "update_flag",
      headerName: "Update",
      width: 120,
      editable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <ViewCheckbox
            fieldFlag={params.row.update_flag ?? 0}
            menuCode={params.row.menu_code}
            type="update_flag"
          />
        );
      },
    },
    {
      field: "export_flag",
      headerName: "Export",
      width: 120,
      editable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <ViewCheckbox
            fieldFlag={params.row.export_flag ?? 0}
            menuCode={params.row.menu_code}
            type="export_flag"
          />
        );
      },
    },
    /*{
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
    },*/
  ];

  const handleCheckAll = (e) => {
    const itemref = [...userGroup];
    itemref.forEach((_item, i) => {
      itemref[i].view_flag = Number(e.target.checked);
      itemref[i].create_flag = Number(e.target.checked);
      itemref[i].update_flag = Number(e.target.checked);
      itemref[i].export_flag = Number(e.target.checked);
    });
    setUserGroup([...itemref]);
  };

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
                  xs={6}
                  lg={6}
                  sx={{
                    display: "flex",
                    //justifyContent: "flex-end",
                    mt: 2,
                    mb: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ height: "35px", borderRadius: 50 }}
                  >
                    {parameterValue.id}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ height: "35px", borderRadius: 50 }}
                  >
                    {parameterValue.name}
                  </Button>

                  {/* <ChildComponent onSelectChange={handleSelectChange} message="Hello from Parent" /> */}
                </Grid>
                <Grid
                  item
                  xs={6}
                  lg={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                    mb: 1,
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox onChange={handleCheckAll} />}
                    label="Check ALL"
                  />
                  {saveButton()}
                </Grid>
              </Grid>

              <div>
                {/* Apply the styles using a style tag */}
                <style>{rowStyle}</style>
                {/* Render the DataGrid component */}
                <TransitionGroup>
                  <DataGrid
                    sx={{ mt: 1, mb: 1 }}
                    rows={userGroup}
                    columns={columnProps}
                    getRowId={(row: any) => row.menu_code}
                    disableRowSelectionOnClick
                    autoHeight
                  />
                </TransitionGroup>
              </div>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default EditUserGroupPermission;
