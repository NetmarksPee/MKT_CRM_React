import React, { useState, useEffect } from "react"
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
//import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Gauge } from '@mui/x-charts/Gauge';


//import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
//import { DataGridPro } from '@mui/x-data-grid-pro';

import Pagination from '@mui/material/Pagination';

import EditNoteIcon from '@mui/icons-material/EditNote';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import PhoneIphoneTwoToneIcon from '@mui/icons-material/PhoneIphoneTwoTone';
import CakeTwoToneIcon from '@mui/icons-material/CakeTwoTone';

//import 'bootstrap/dist/css/bootstrap.min.css'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import axios from 'axios'
import Box from "@mui/material/Box";

import { format } from "date-fns";
import PopupConfirm, { PopUpType } from "../Shares/PopupConfirm";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { Paper, Slide, Backdrop, PaginationItem } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { TransitionGroup } from 'react-transition-group';
import { stylePopUpConfirm, StyleBoxCell } from "../Shares/StyleControl";



function BasicBreadcrumbs() {
  const curr_page_name = "PERSONAL LIST";
    
  return (
    <div role="presentation" >
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
      <Typography  gutterBottom sx={{ fontWeight: '700' }}>
          {curr_page_name}
      </Typography>
    </div>
  );
}

const StatusEnum = {
  A: 'Active',
  I: 'Inactive', 
};

export default function Personal() {
  const [selData, setData] = useState({ 
        id: 0,
        firstname: ' ',
        lastname: ' ',
        title: ' ',
        birthday: new Date(),
        mobileno: ' ',
        oftelno: null,
        email: null,
        position: null,
        customer_id: ' ',
        source: null,
        interest: null,
        target_solution: null,
        status: 'A',
        create_date: new Date(),
        update_date: null,
        create_by: 'Admin',
        update_by: null,
        nickname: null, scrmode: "new" });

  const [isLoading, setIsLoading] = useState(true);

  const [ListStatus, setListStatus] = useState([]);

  const { Popup } = PopupConfirm(false);
  //const [TypePopUp, setTypePopUp] = useState(PopUpType.Delete);

  const navigate = useNavigate();

  //const delay = ms => new Promise(res => setTimeout(res, ms));

  const callApi = async () => {
    setIsLoading(true);
    const apiUrl = import.meta.env.VITE_CRM_API_URL + 'personal';
    const res = await axios.get(apiUrl)
    const data_format = await res.data
    setPersonal(data_format);
    //await delay(5000);

    setIsLoading(false);
    
  }

  const callApiStatus = async () => {
    setIsLoading(true);
    const apiUrl = import.meta.env.VITE_CRM_API_URL + 'getstatus/MasterStatus';
    const res = await axios.get(apiUrl)
    const data_format = await res.data

    setListStatus(data_format);
    setIsLoading(false);
  }
  
  useEffect(() => {
    callApi();
  }, [])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  const us: unknown[] | (() => unknown[]) = []
  const [rows2 , setPersonal] = useState(us)

  

  
  async function Delete(data) {
    setData(data);
    await handleOpen();

  }

  async function handlerDelete() {
    const apiUrl =  import.meta.env.VITE_CRM_API_URL + '/personal/remove';

    const response = await axios.post(apiUrl, selData);
    console.log('Response:', response.data);

    await handleClose();

    callApi();
}


function colName(row) {
    return(
      `${row.title || ''} ${row.firstname || ''} ${row.email || ''} ${row.customer_id || ''}` 
    )
}
function colContact(row) {
  return(
    `${row.mobileno || ''} ${row.oftelno || ''} ${row.lastname || ''} ${row.nickname || ''} ${row.position || ''}` 
  )
}



function DispName(row) {
  return(
    <Box
        sx={StyleBoxCell}
      >
        {/* {`${row.title} ${row.firstname} ${row.lastname} \n${row.customer_id} \nPosition : ${row.position || '-'} \nNickName : ${row.nickname || '-'}`} */}
        <span style={{ fontWeight:"bold" }} >{row.title} {row.firstname} {row.lastname}</span>
        <span style={{ fontStyle:"italic", fontWeight:"bold", color:"gray", fontSize:"13px" }} >{row.customer_id}</span>
        <span>Position : {row.position || '-'} </span>
        <span>Nickname : {row.nickname || '-'}</span>
        <span><CakeTwoToneIcon fontSize="small" /> {format(row.birthday, "dd/MM/yyyy")}</span>
      </Box>
  )
}

function DispContact(row) {
  return(
    <Box
        sx={StyleBoxCell}
      >
        {/* {`Mobile No.: ${row.mobileno || '-'} \nOffice No.: ${row.oftelno || '-'} \nE-Mail: ${row.email || '-'}`} */}
        <span><PhoneIphoneTwoToneIcon fontSize="small" /> {row.mobileno || '-'} </span>
        <span><CallTwoToneIcon fontSize="small" /> {row.oftelno || '-'}</span>
        <span><EmailTwoToneIcon fontSize="small"/> {row.email || '-'}</span>
      </Box>
  )
}

function CreateDisp(row) {
  return(
    <Box
      sx={StyleBoxCell}
    >
       <span>{format(row.create_date, "dd/MM/yyyy HH:mm")}</span>
       <span>{row.create_by}</span>
    </Box>
  )
}

function dispPercentResponse(row) {
  return(
    <Box
      sx={StyleBoxCell}
    >
       <Gauge width={70} height={70} value={60} />
    </Box>
  )
};

function UpdateDisp(row) {

  if (row.update_by === null){
    return(
      <div>
        -
      </div>
    )
  }
  else{
    return(
      <Box
        sx={StyleBoxCell}
      >
        <span>{format(row.update_date, "dd/MM/yyyy HH:mm")}</span>
        <span>{row.update_by}</span>
      </Box>
    )
  }
}

  const columns: GridColDef<(typeof rows2)[number]>[] = [
      { field: 'id', 
        headerName: 'ID', 
        width: 60,
        editable: false,
        renderCell: (params) => DispID(params.row)
      },
      {
        field: 'detail',
        headerName: 'Personal Detail',
        width: 220, 
        sortable: false,
        valueGetter: (value, row) => colName(row),
        renderCell: (params) => DispName(params.row),
      },
      {
        field: 'contact',
        headerName: 'Contact',
        headerAlign: "left",
        width: 210,
        align: 'left',
        editable: false,
        valueGetter: (value, row) => colContact(row),
        renderCell: (params) => DispContact(params.row),
      },
      {
        field: 'percent',
        headerName: '% Response',
        headerAlign: "center",
        width: 100,
        align: 'center',
        editable: false,
        renderCell: (params) => dispPercentResponse(params.row)
      },
      {
        field: 'status',
        headerName: 'Status',
        headerAlign: "center",
        width: 80,
        align: 'center',
        editable: false,
        renderCell: (params) => DispStatus(params.row)
      },
      {
        field: 'create',
        headerName: 'Created',
        headerAlign: "center",
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        align: 'center',
        width: 140, 
        renderCell: (params) => CreateDisp(params.row),
        //valueGetter: (value, row) => `${row.create_date || ''} \n ${row.create_by || ''}`, 
      },
      {
        field: 'update',
        headerName: 'Updated',
        headerAlign: "center",
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        align: 'center',
        width: 140,
        renderCell: (params) => UpdateDisp(params.row),
        // valueGetter: (value, row2) => `${row2.update_date || ''} ${row2.update_by || ''}`,
      },
      
      {
        field: 'Action',
        headerName: 'Action', 
        headerAlign: "center",
        sortable: false,
        align: 'center',
        width: 120,
        renderCell: (params) => buttonModel(params.row),
      },
      
    ];

  
 


const rowStyle = `
  .MuiDataGrid-row {
    border-bottom: none;
  }
`;

  const handleAdd = () => {
    const parameterValue = { scrmode: "new" };
      
      navigate('/PersonalDetail', { state: { parameterValue } });
    };

  const handleEdit = (row) => {
      const parameterValue = { 
          name : row.name, 
          id: row.id,
          description: row.description,
          status: row.status, scrmode: "edit", 
          create_date: row.create_date,
          create_by: row.create_by, 
          update_date: row.update_date,
          update_by: row.update_by};

      // setData2(row);
      // handleOpen();
      navigate('/PersonalDetail', { state: { parameterValue } });
    };

    function DispStatus(row) {
      const statusLabel = StatusEnum[row.status];

      const ChipColor = (statusLabel === "Active" ? "info": "default");

      return(
        <Chip  label={statusLabel} color={ChipColor} sx={{width:'70px'}}  />
      )
    };

    function DispID(row) {
      return(
        <Chip size="small" label={row.id} color="secondary"   />
      )
    }

   

    function buttonModel(row) {
      
      return (
        <div>
            <IconButton onClick={() => handleEdit(row)} aria-label="EditIcon" sx={{ color:"gold"}}>
                <EditNoteIcon fontSize="medium" />
            </IconButton>
            <IconButton onClick={() => Delete(row)} aria-label="fingerprint"  color="error">
                <DeleteForeverIcon fontSize="medium" />
            </IconButton>
        </div>
      )
    }

    const CustomPagination = (props) => {
      const { state, api } = props;
      return (
        <Pagination
          color="secondary"
          variant="outlined"
          count={Math.ceil(state.pagination.rowCount / state.pagination.pageSize)}
          page={state.pagination.page + 1}
          onChange={(event, value) => api.current.setPage(value - 1)}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: () => null, next: () => null }}
              {...item}
            />
          )}
        />
      );
    };

    const [currpage, setPage] = React.useState(2);
    const [currpageSize, setPageSize] = React.useState(5);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      //alert(value);
      setPage(value);
    };

   
    
    return (

        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <BasicBreadcrumbs />
                <Paper sx={{ borderRadius: 5 }}>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1 } }} autoComplete="off">
                        <Stack sx={{ m:1}} >
                            <Grid container spacing={2}>
                              {/* <Grid item xs={1} lg={1} sx={{ justifyContent: 'flex-start', mt:2, mb:1 }}>
                                  <ComboRowPage  />
                              </Grid> */}
                                <Grid item xs={12} lg={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt:2, mb:1 }}>
                                    <Button variant="contained" color="secondary"
                                                sx={{ height: '35px', borderRadius: 50 }} onClick={handleAdd}>
                                        <AddIcon />Add Personal
                                    </Button>
                                    {/* <ChildComponent onSelectChange={handleSelectChange} message="Hello from Parent" /> */}
                                </Grid>
                            </Grid>

                            <div>
                                {/* Apply the styles using a style tag */}
                                <style>{rowStyle}</style>
                                {/* Render the DataGrid component */}
                                <TransitionGroup>
                                      <DataGrid sx={{ mt: 1, mb: 1 }}
                                            rows={rows2}
                                            columns={columns}
                                            loading={isLoading}
                                            rowHeight={95}
                                            //disableColumnSelector
                                            filterMode="client"
                                            disableDensitySelector
                                            slots={{ toolbar: GridToolbar }}
                                            slotProps={{
                                              toolbar: {
                                                showQuickFilter: true
                                              },
                                            }}
                                            initialState={{
                                              pagination: { 
                                                paginationModel: {
                                                  pageSize: 8, 
                                                  page: currpage, 
                                                },  
                                              },
                                            }}
                                            pageSizeOptions={[8, 10, 20, 30]}
                                            disableRowSelectionOnClick
                                          />
                              
                                      <Grid item xs={12} lg={12} sx={{ display: 'flex', justifyContent: 'center', mt:2, mb:1 }}>
                                          <Pagination 
                                              count={Math.ceil(rows2.length / currpageSize)}
                                              page={currpage}
                                              onChange={handleChange}
                                              color="secondary"
                                            />
                                      </Grid> 
                                        
                                        
                                        
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
                                  <Popup TypePopUp={PopUpType.Delete}
                                      onClickOK={handlerDelete} 
                                      onClickCancel={handleClose} />
                              </Box>
                            </Slide>
                            
                        </Modal>
                      
                    </Box> 
                </Paper>
                 
            </Container>
        </React.Fragment>
    )
}


