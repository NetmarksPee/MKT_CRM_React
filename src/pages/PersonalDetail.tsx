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
import { Backdrop, Container, CssBaseline, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Slide } from "@mui/material";
//import { GridAddIcon } from "@mui/x-data-grid";

//import Select, { SelectChangeEvent } from '@mui/material/Select';

import ComboStatus from "../Shares/comboStatus";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { stylePopUpConfirm } from "../Shares/StyleControl";
import PopupConfirm, { PopUpType } from "../Shares/PopupConfirm";
import { Dayjs } from "dayjs";

//import PopupConfirm from "../Shares/PopupConfirm";

const PersonalDetail = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [ListCustomer, setListCustomer] = useState([]);


    const handlesetBirthday= (event) => {
        setValue('selData2.birthday', event.t.value);
    };

    const { Popup } = PopupConfirm(false);

    const location = useLocation();
    const { parameterValue  } = location.state;
    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
        selData2: { 
            id: 0,
            firstname: ' ',
            lastname: ' ',
            title: ' ',
            birthday: Dayjs ,
            mobileno: ' ',
            oftelno: ' ',
            email: ' ',
            position: ' ',
            customer_id: ' ',
            source: ' ',
            interest: ' ',
            target_solution: ' ',
            status: 'A',
            create_date: new Date(),
            update_date: new Date(),
            create_by: 'Admin',
            update_by: ' ',
            nickname: ' ', scrmode: 'new' }
        }
      });

    const callApiCustomer= async () => {

        const apiUrl = import.meta.env.VITE_CRM_API_URL + 'Customer';
        const res = await axios.get(apiUrl)
        const data_format = await res.data
    
        setListCustomer(data_format);

        //const ret =  JSON.stringify(ListCustomer[0])
        //alert(ret);
      }


    const callApi = async () => {

        if (parameterValue.scrmode === 'edit'){
            const apiUrl = import.meta.env.VITE_CRM_API_URL +'personal/' + parameterValue.id;
            const res = await axios.get(apiUrl);
                
            const data_format = await res.data;
            
            reset({
                selData2: {
                    id: data_format.id,
                    firstname: data_format.firstname,
                    lastname: data_format.lastname,
                    title: data_format.title,
                    birthday: data_format.birthday,
                    mobileno: data_format.mobileno ? data_format.mobileno : '',
                    oftelno: data_format.oftelno ? data_format.oftelno : '',
                    email: data_format?.email,
                    position: data_format.position,
                    customer_id: data_format.customer_id,
                    source: data_format.source,
                    interest: data_format.interest,
                    target_solution: data_format.target_solution,
                    status: data_format.status,
                    create_date: data_format.create_date,
                    update_date: data_format.update_date,
                    create_by: data_format.create_by,
                    update_by: data_format.update_by,
                    nickname: data_format.nickname,
                  scrmode: 'edit'
                }
              });
        }
        else{
            reset({
                selData2: {
                    id: 0,
                    firstname: '',
                    lastname: '',
                    title: '',
                    birthday: Dayjs,
                    mobileno: '',
                    oftelno: '',
                    email: '',
                    position: '',
                    customer_id: '',
                    source: '',
                    interest: '',
                    target_solution: '',
                    status: 'A',
                    create_date: new Date(),
                    update_date: new Date(),
                    create_by: 'Admin',
                    update_by: '',
                    nickname: '',
                  scrmode: 'new'
                }
              });    
        }
       
        //setData2(data_format)
    }
      
    useEffect(() => {
        callApi();    
        callApiCustomer();
    }, [])

    const validateTitle = () => {
        return(
            {...register('selData2.title', { required: 'Title is required',
                 maxLength: { value: 50,  message: 'Lenght cannot over 50 digits'}
                                })}
        )
      }

    const validatename = () => {
        return(
            {...register('selData2.firstname', { required: 'Firstname is required',
                 maxLength: { value: 50,  message: 'Lenght cannot over 50 digits'}
                                })}
        )
      }

    const validatedescription = () => {
        return(
            {...register('selData2.lastname', { required: 'Lastname is required', 
                maxLength: { value: 200,  message: 'Lenght cannot over 200 digits'}
                                })}
        )
    }

    const validateEmail = () => {
        return(
            {...register('selData2.email', { required: 'E-Mail is required', 
                maxLength: { value: 50,  message: 'Lenght cannot over 200 digits'}
                                })}
        )
    }

    const validateMobileNo = () => {
        return(
            {...register('selData2.mobileno', { required: 'Mobile No. is required', 
                maxLength: { value: 20,  message: 'Lenght cannot over 200 digits'}
                                })}
        )
    }
    
    const validateofTelNo = () => {
        return(
            {...register('selData2.oftelno', { required: 'Office Tel.No. is required', 
                maxLength: { value: 20,  message: 'Lenght cannot over 200 digits'}
                                })}
        )
    }
    
    const validateposition = () => {
        return(
            {...register('selData2.position', {  
                maxLength: { value: 20,  message: 'Lenght cannot over 20 digits'}
                                })}
        )
    }

    const validateSource = () => {
        return(
            {...register('selData2.source', {  
                maxLength: { value: 200,  message: 'Lenght cannot over 200 digits'}
                                })}
        )
    }

    const validateInterest= () => {
        return(
            {...register('selData2.interest', {  
                maxLength: { value: 200,  message: 'Lenght cannot over 200 digits'}
                                })}
        )
    }

    const validatetarget_solution= () => {
        return(
            {...register('selData2.target_solution', {  
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

        const curr_page_name = scrPrefixName + " PERSONAL";
        
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
                    PERSONAL LIST
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
        const apiUrl = import.meta.env.VITE_CRM_API_URL + 'personal/insert';

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
        const apiUrl = import.meta.env.VITE_CRM_API_URL + 'personal/update';
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
        navigate("/Personal");
    }                         
                                
    const handleSelectChange = (selectedOption : string) => {
        setValue('selData2.status', selectedOption);
    };

    const handleCustomerChange = (event) => {
        setValue('selData2.customer_id', event.target.value);
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
                            <Grid item xs={12} lg={7} sx={{ mt:1 }}>
                                <Stack sx={{m:3}} direction="column" spacing={2}>
                                    <Grid container gap={2} justifyContent="space-between" >
                                        <Grid item xs={12} lg={4} >
                                            <TextField fullWidth inputProps={{ readOnly: true }}
                                                required placeholder="Auto Gen"
                                                {...register('selData2.id')}
                                                id="txtID"
                                                label="ID (Auto Generate)"
                                                name="id"
                                                margin="normal"
                                                sx={{ fontStyle:"italic", fontSize: "15px" }}
                                                variant="standard" /> 
                                        </Grid>
                                        <Grid item xs={12} lg={7} >
                                            <TextField fullWidth inputProps={{ readOnly: true }}
                                                {...register('selData2.nickname')}
                                                id="txtNickName"
                                                label="Nick Name"
                                                name="nickname"
                                                margin="normal"
                                                variant="standard" />

                                        </Grid>

                                        <Grid item xs={12} lg={2}  >
                                            <TextField fullWidth 
                                                required 
                                                {...validateTitle()}
                                                id="txtTitle"
                                                label="Title"
                                                margin="normal"
                                                error={!!errors.selData2?.title}
                                                helperText={errors.selData2?.title ? errors.selData2.title.message : ''}
                                                variant="standard" /> 
                                        </Grid>
                                        <Grid item xs={12} lg={4}  >
                                            <TextField fullWidth 
                                                required 
                                                {...validatename()}
                                                id="txtFirstName"
                                                label="Firstname"
                                                margin="normal"
                                                error={!!errors.selData2?.firstname}
                                                helperText={errors.selData2?.firstname ? errors.selData2.firstname.message : ''}
                                                variant="standard" /> 
                                        </Grid>
                                        <Grid item xs={12} lg={5}  >
                                            <TextField fullWidth 
                                                id="txtLastName"
                                                label="Lastname"
                                                margin="normal"
                                                {...validatedescription()}
                                                error={!!errors.selData2?.lastname}
                                                helperText={errors.selData2?.lastname ? errors.selData2.lastname.message : ''}
                                                multiline
                                                variant="standard" />    
                                        </Grid>
                                        <Grid item xs={12} lg={12}>
                                            <FormControl variant="standard" fullWidth sx={{ m: 1 }} >
                                                <InputLabel id="select-label">Customer Company</InputLabel>
                                                <Select
                                                    labelId="Company"
                                                    value={watch().selData2.customer_id}
                                                    onChange={handleCustomerChange}
                                                    label="Select Customer Company"
                                                >
                                                    {ListCustomer.map((cust) => (
                                                        <MenuItem key={cust.CustomerCode} value={cust.CustomerCode}>
                                                            {cust.CustomerName1}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {/* <Autocomplete
                                                    disablePortal fullWidth
                                                    id="combo-box-demo"
                                                    options={ListCustomer}
                                                    value={watch().selData2.customer_id}
                                                    onChange={handleCustomerChange}
                                                    getOptionLabel={(option) => option.CustomerName1} 
                                                    renderInput={(params) => <TextField {...params} label="Customer Company" variant="standard" />} /> */}
                                        </Grid>
                                       
                                        <Grid item xs={12} lg={5}  >
                                            <TextField fullWidth 
                                                id="txtPosition"
                                                label="Position"
                                                margin="normal"
                                                {...validateposition()}
                                                error={!!errors.selData2?.position}
                                                helperText={errors.selData2?.position ? errors.selData2.position.message : ''}
                                                variant="standard" />    
                                        </Grid>  
                                        <Grid item xs={12} lg={5}  >
                                            <TextField fullWidth 
                                                id="txtEmail"
                                                label="E-Mail"
                                                margin="normal"
                                                {...validateEmail()}
                                                error={!!errors.selData2?.email}
                                                helperText={errors.selData2?.email ? errors.selData2.email.message : ''}
                                                multiline
                                                variant="standard" />    
                                        </Grid>    
                                        
                                        <Grid item xs={12} lg={5}  >
                                            <TextField fullWidth 
                                                id="txtMobileNo"
                                                label="Mobile No."
                                                margin="normal"
                                                {...validateMobileNo()}
                                                error={!!errors.selData2?.mobileno}
                                                helperText={errors.selData2?.mobileno ? errors.selData2.mobileno.message : ''}
                                                multiline
                                                variant="standard" />    
                                        </Grid>
                                        <Grid item xs={12} lg={5}  >
                                            <TextField fullWidth 
                                                id="txtOfTelno"
                                                label="Office Tel.No."
                                                margin="normal"
                                                {...validateofTelNo()}
                                                error={!!errors.selData2?.oftelno}
                                                helperText={errors.selData2?.oftelno ? errors.selData2.oftelno.message : ''}
                                                multiline
                                                variant="standard" />    
                                        </Grid>   
                                          

                                        <Grid item xs={12} lg={12}  >
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker {...register('selData2.birthday')}
                                                        onChange={(newValue) => handlesetBirthday(newValue)} />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Grid>    

                                        <Grid item xs={12} lg={12}  >
                                            <TextField fullWidth 
                                                id="txtsource"
                                                label="Source"
                                                margin="normal"
                                                {...validateSource()}
                                                error={!!errors.selData2?.source}
                                                helperText={errors.selData2?.source ? errors.selData2.source.message : ''}
                                                multiline
                                                variant="standard" />    
                                        </Grid>
                                        <Grid item xs={12} lg={12}  >
                                            <TextField fullWidth 
                                                id="txtinterest"
                                                label="Interest"
                                                margin="normal"
                                                {...validateInterest()}
                                                error={!!errors.selData2?.interest}
                                                helperText={errors.selData2?.interest ? errors.selData2.interest.message : ''}
                                                multiline
                                                variant="standard" />    
                                        </Grid>
                                        <Grid item xs={12} lg={12}  >
                                            <TextField fullWidth 
                                                id="txttarget_solution"
                                                label="Target Solution"
                                                margin="normal"
                                                {...validatetarget_solution()}
                                                error={!!errors.selData2?.target_solution}
                                                helperText={errors.selData2?.target_solution ? errors.selData2.target_solution.message : ''}
                                                multiline
                                                variant="standard" />    
                                        </Grid>
                                        <Grid item xs={12} lg={12}  >
                                            <ComboStatus 
                                                onSelectChange={handleSelectChange} 
                                                selectedValue={watch().selData2.status}
                                                // selectedValue={...register('selData2.')} 
                                                />
                                        </Grid>

                                    </Grid>
                                        
                                </Stack>
                            </Grid>

                            <Grid item xs={12} lg={5} sx={{ mt:1 }}>
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

export default PersonalDetail

