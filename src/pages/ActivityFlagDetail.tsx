import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import axios from 'axios';
import React, { useEffect, useState  } from "react"


import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { Backdrop, Container, CssBaseline, Modal, Paper, Slide } from "@mui/material";
//import { GridAddIcon } from "@mui/x-data-grid";

//import Select, { SelectChangeEvent } from '@mui/material/Select';

import ComboStatus from "../Shares/comboStatus";
import ComboType from "../Shares/comboType";

import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { stylePopUpConfirm } from "../Shares/StyleControl";
import PopupConfirm, { PopUpType } from "../Shares/PopupConfirm";

//import PopupConfirm from "../Shares/PopupConfirm";

const ActivityFlagDetail = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { Popup } = PopupConfirm(false);

    const location = useLocation();
    const { parameterValue  } = location.state;
    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
        selData2: { 
            id: 0, name: ' ', description: ' ', 
            status: "A", type: 1, 
            create_date: new Date(), create_by: 'Admin',
            update_date: new Date(), update_by: ' ', scrmode: 'new' }
        }
      });


    const callApi = async () => {

        if (parameterValue.scrmode === 'edit'){
            const apiUrl = import.meta.env.VITE_CRM_API_URL +'activityflag/' + parameterValue.id;
            const res = await axios.get(apiUrl);
                
            const data_format = await res.data;
            
            reset({
                selData2: {
                  id: data_format.id,
                  name: data_format.name,
                  description: data_format.description,
                  type: data_format.type,
                  status: data_format.status,
                  create_date: data_format.create_date,
                  create_by: data_format.create_by,
                  update_by: data_format.update_by,
                  update_date: data_format.update_date,
                  scrmode: 'edit'
                }
              });
        }
        else{
            reset({
                selData2: {
                  id: 0,
                  name: '',
                  description: '',
                  type: 1,
                  status: "A",
                  create_date: new Date(),
                  create_by: 'Admin',
                  update_by: '',
                  update_date: new Date(),
                  scrmode: 'new'
                }
              });    
        }
       
        //setData2(data_format)
    }
      
    useEffect(() => {
        callApi();    
    }, [])

    const validatename = () => {
        return(
            {...register('selData2.name', { required: 'Name is required',
                 maxLength: { value: 50,  message: 'Lenght cannot over 50 digits'}
                                })}
        )
      }

    const validatedescription = () => {
        return(
            {...register('selData2.description', { required: 'Desc is required', 
                maxLength: { value: 200,  message: 'Lenght cannot over 200 digits'}
                                })}
        )
    }
    
    


    const onSubmit = async (data: unknown) => {
        await handleOpen();
      };

    const handleSave = async () =>{
            //const ret =  JSON.stringify(watch().selData2)
            //alert(ret);
            if (parameterValue.scrmode === "new"){     
                await Add(watch().selData2);
            }
            else{
                await Edit(watch().selData2);
            }
            back();
      };

    
    function BasicBreadcrumbs() {
    
        const scrPrefixName = (parameterValue.scrmode === "new" ? "ADD" : "EDIT");

        const curr_page_name = scrPrefixName + " ACTIVITY FLAG";
        
        return (
            <div role="presentation" >
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                <HomeIcon />
                </Link>
                <Link
                underline="hover"
                color="inherit"
                href="./ActivityFlag"
                >
                    ACTIVITY FLAG LIST
                </Link>
                <Typography color="text.primary">{curr_page_name}</Typography>
            </Breadcrumbs>
    
            <Typography  gutterBottom sx={{ fontWeight: '700' }}>
                    {curr_page_name}
            </Typography>
            </div>
        );
    }
    

    // useEffect(() => {
    //     setData2(parameterValue);
    //   })

   

    async function Add(data) {
        //alert(data.email)
        const apiUrl = import.meta.env.VITE_CRM_API_URL + 'activityflag/insert';

        const response = await axios.post(apiUrl, data, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
            },
          });
        console.log('Response:', response.data);

    }

    async function Edit(data) {
        //alert(data.email)
        const apiUrl = import.meta.env.VITE_CRM_API_URL + 'activityflag/update';
        console.log(data);

        const response = await axios.post(apiUrl, data, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
            },
          });

        //alert("After Post : " + response.statusText);

        console.log('Response:', response.data);

        // const updatedObject = rows2.map((item) =>
        //   item.id === data.id ? data : item
        // ); 
    }

    const navigate = useNavigate();

    const back= ()=>{
        navigate("/ActivityFlag");
    }                         
                                
    const handleSelectChange = (selectedOption : string) => {
        setValue('selData2.status', selectedOption);
    };

    const handleSelectTypeChange = (selectedOption : number) => {
        setValue('selData2.type', selectedOption);
    };

 
    const saveButton =() => {
        if (parameterValue.scrmode === "new"){
            return(
                <Button color="warning" type="submit"
                    variant="contained" sx={{ width: '100px', borderRadius: 50 }}
                    >Add</Button>
            )
        }
        else
        {
            return(
                <Button color="success" type="submit"
                    variant="contained" sx={{ width: '100px', borderRadius: 50 }}
                     >Save</Button>
            )
        }
        
    }

    const UpdateDateDisp = () => {

        try {
            return (format(watch().selData2.update_date, "dd/MM/yyyy HH:mm"));
        }
        catch{
            return ("");
        }
    }


    
    return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <BasicBreadcrumbs />
                <Paper sx={{mt:3, borderRadius: 5}}>
                    {/* <p>{parameterValue.name}</p>
                    <p>{parameterValue.description}</p>
                    <p>{parameterValue.id}</p>
                    <p>{parameterValue.status}</p> */}

                    <Box noValidate onSubmit={handleSubmit(onSubmit)}
                        component="form" sx={{
                              '& .MuiTextField-root': { m: 1 },
                          }} autoComplete="off">
                       
                       <Grid container spacing={2}> 
                            <Grid item xs={12} lg={6} sx={{ mt:1 }}>
                                    <Stack sx={{m:3}} direction="column" spacing={2}>
                                        <TextField fullWidth inputProps={{ readOnly: true }}
                                            required placeholder="Auto Gen"
                                            {...register('selData2.id')}
                                            id="txtID"
                                            label="ID (Auto Generate)"
                                            name="id"
                                            margin="normal"
                                            variant="standard" />
                                        
                                        <TextField fullWidth 
                                            required 
                                            {...validatename()}
                                            id="txtName"
                                            label="Name"
                                            margin="normal"
                                            error={!!errors.selData2?.name}
                                            helperText={errors.selData2?.name ? errors.selData2.name.message : ''}
                                            variant="standard" /> 
                                        
                                        <TextField fullWidth 
                                            id="txtDesc"
                                            label="Description"
                                            margin="normal"
                                            {...validatedescription()}
                                            error={!!errors.selData2?.description}
                                            helperText={errors.selData2?.description ? errors.selData2.description.message : ''}
                                            multiline
                                            variant="standard" />

                                        <ComboType 
                                            onSelectChange={handleSelectTypeChange}
                                            selectedValue={watch().selData2.type}
                                              />
                                        
                                        <ComboStatus 
                                            onSelectChange={handleSelectChange} 
                                             selectedValue={watch().selData2.status}
                                            // selectedValue={...register('selData2.')} 
                                              />
                                        
                            
                                    </Stack>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ mt:1 }}>
                                    <Stack sx={{m:3}} direction="column" spacing={2}>
                                        <Grid container >
                                            <Grid item xs={6} >
                                                <TextField fullWidth  inputProps={{ readOnly: true }}
                                                    id="txtCreateDate" disabled
                                                    label="Created Date"
                                                    value={format(watch().selData2.create_date, "dd/MM/yyyy HH:mm")}
                                                    // value={format(selData.create_date, "dd/MM/yyyy HH:mm")}
                                                    variant="standard"
                                                    />
                                            </Grid>
                                            <Grid item xs={5} sx={{ml:1}} >
                                                <TextField fullWidth  inputProps={{ readOnly: true }}
                                                    id="txtCreateBy" disabled
                                                    label="Created By"
                                                    {...register('selData2.create_by')} 
                                                    // value={selData.create_by}
                                                    variant="standard"
                                                    />
                                            </Grid>

                                            <Grid item xs={6} >
                                                <TextField fullWidth  inputProps={{ readOnly: true }}
                                                    id="txtUpdateDate2" disabled
                                                    label="Updated Date"
                                                    value={UpdateDateDisp()}
                                                    variant="standard"
                                                    />
                                            </Grid>
                                            <Grid item xs={5} sx={{ml:1}} >
                                                <TextField fullWidth  inputProps={{ readOnly: true }}
                                                    id="txtUpdateBy2" disabled
                                                    label="Update By"
                                                    {...register('selData2.update_by')}
                                                    variant="standard"
                                                    />
                                            </Grid>
                                            
                                        </Grid>
                                    </Stack>
                            </Grid>
                            <Grid item xs={12}  sx={{m:3}}>
                                <Stack direction="row" spacing={1} justifyContent="flex-end">
                                    {saveButton()}

                                    <Button color="inherit" 
                                        variant="contained" sx={{ width: '100px', borderRadius: 50 }}
                                        onClick={() => back()}>Cancel</Button>
                                </Stack>
                            </Grid>
                       </Grid>

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
                                  <Popup TypePopUp={PopUpType.Save}
                                      onClickOK={handleSave} 
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

export default ActivityFlagDetail

