import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import React, { useState, useEffect  } from "react"

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function ActivityDetail(selData, scrmode)  {
    const scr_mode = scrmode;

    const [btnCaption, setBtnCaption ] = useState('');
    const [isReadOnly, setReadOnly ] = useState(false);

    useEffect(() => {
        setMode()
      })

    const setMode = () => {
        if (scr_mode === "New"){
            setBtnCaption("Add");
            setReadOnly(false);
        }
        else {
            setBtnCaption("Save");
            setReadOnly(true);
        }
    }

    return(
        <>
            <Box sx={style}>
                <Grid container spacing={2}>  
                    <Grid item xs={12} lg={12}>
                        <Typography variant="h5">
                            Add Activity Flag Detail
                        </Typography>
                    </Grid>
                    

                    <Grid item xs={12} lg={8}>
                        <Stack gap={3} className="m-1">
                            
                            <TextField fullWidth inputProps={{ readOnly: isReadOnly }}
                                required
                                id="outlined-required"
                                label="ID"
                                name="id"
                                variant="standard"
                                value={selData.id} 
                                // onChange={e => updateID(e.target.value)}
                                />
                            <TextField fullWidth
                                required
                                id="outlined-required"
                                label="Personal Name"
                                error={selData.name === ""}
                                name="name"
                                variant="standard"
                                value={selData.name} 
                                //onChange={e => updateName(e.target.value)}
                                />

                                <TextField fullWidth
                                id="outlined-required"
                                label="E-Mail"
                                name="email"
                                variant="standard"
                                value={selData.email} 
                                //onChange={e => updateEmail(e.target.value)}
                                />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Stack gap={3} className="m-1">
                            <TextField fullWidth disabled inputProps={{ readOnly: true }}
                                id="txtCreateDate"
                                label="Created Date"
                                value="2024/4/10 10:10:10"
                                variant="standard"
                                />
                            <TextField fullWidth disabled inputProps={{ readOnly: true }}
                                id="txtModifyDate"
                                label="Modify Date"
                                value="2024/4/12 10:10:10"
                                variant="standard"
                                />
                            
                        </Stack>                           
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" className="m-3 float-end" >Cancel</Button>
                        <Button variant="contained" sx={{ width: '100px' }} className="m-3 float-end">{btnCaption}</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
} 

export default ActivityDetail