import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";
//import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";

//import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef } from "@mui/x-data-grid";

//import 'bootstrap/dist/css/bootstrap.min.css'
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid/Grid";

import axios from "axios";
import Box from "@mui/material/Box";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import { Paper } from "@mui/material";

import { TransitionGroup } from "react-transition-group";

export type Root = IResponseSale[];

export interface IResponseSale {
  UserID: number;
  Username: string;
  Email: string;
  UserGroupCode: string;
  UserGroupName: string;
  UserGroupDescription: string;
}

function BasicBreadcrumbs() {
  const curr_page_name = "Sale Person";

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

const CustomerIndustry = () => {
  const [SalePerson, SetSalePerson] = useState<Root>([]);

  const callApi = async () => {
    try {
      const apiUrl = import.meta.env.VITE_CRM_API_URL + "sales";
      const response = await axios.get<Root>(apiUrl);
      SetSalePerson(response.data);
    } catch (error) {
      console.log("error =>", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const columnProps: GridColDef<IResponseSale>[] = [
    { field: "UserID", headerName: "Sale Code", width: 150 },
    {
      field: "Username",
      headerName: "Sale Name",
      width: 200,
      editable: false,
    },
    {
      field: "Email",
      headerName: "Email",
      headerAlign: "center",
      sortable: false,
      width: 300,
    },
  ];

  const rowStyle = `
  .MuiDataGrid-row {
    border-bottom: none;
  }
`;
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
                    rows={SalePerson}
                    columns={columnProps}
                    getRowId={(row: IResponseSale) => row.UserID}
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
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default CustomerIndustry;
