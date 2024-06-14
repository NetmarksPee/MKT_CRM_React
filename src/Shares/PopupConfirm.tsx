//import Button from "@mui/material/Button";
//import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import { useState } from "react"
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { useTheme } from '@mui/material/styles';
import { colors } from "@mui/material";
import { pink } from "@mui/material/colors";

//import Slide from "@mui/material/Slide";
//import Box from "@mui/material/Box";
//import Modal from "@mui/material/Modal";

export enum PopUpType {
    'Delete',
    'Save',
    'Exit'
}

function PopupConfirm(initialRet = false) {
    const [isConfirm, setConfirm] = useState(initialRet);

    

  
    const Popup = ({ TypePopUp, onClickOK, onClickCancel }) => {
        let Header2: string = "";
        let Detail2: string = "";

        const handlerConfirm = () => {
            setConfirm(true);
            onClickOK();
    
        }
    
        const handlerCancel = () => {
            setConfirm(false);
            onClickCancel();
        }

        const getColor = () => {
            switch (TypePopUp as PopUpType) {
              case PopUpType.Delete:
                return 'error';
              case PopUpType.Save:
                return 'secondary';
              case PopUpType.Exit:
                return 'warning';

              default:
                return 'default'; // Or any other valid color prop value
            }
        }

        const setIcon = () => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const theme = useTheme();

            const IconStyle ={ 
                '.MuiChip-icon': {
                  marginLeft: 2, // Remove default left margin
                  marginRight: 0, // Remove default right margin
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '50px', // Adjust width if necessary
                },
                '.MuiChip-label': {
                  paddingLeft: '8px', // Add left padding to the label
                  paddingRight: '8px', // Add right padding to the label
                }, height: '50px', width: '50px', borderRadius: 50
              }

            let backgroundColorStyle = {
                backgroundColor: theme.palette.error.light,
              };
              
            // eslint-disable-next-line no-case-declarations
            let combinedStyles = [backgroundColorStyle, IconStyle];
            
            switch (TypePopUp as PopUpType){
                case PopUpType.Delete:
                    Header2 = 'Delete';
                    Detail2 = 'กรุณายืนยันการลบข้อมูล หลังจากลบข้อมูลนี้แล้ว จะไม่สามารถนำกลับมาใช้ได้';

                    backgroundColorStyle = {
                        backgroundColor: theme.palette.error.light, 
                      };

                    combinedStyles = [backgroundColorStyle, IconStyle];
                      
                    return(
                        <Chip icon={<DeleteForeverOutlinedIcon 
                            fontSize="large" color={getColor()} />} 
                            sx={ combinedStyles } />
                    )
                case PopUpType.Save:
                    Header2 = 'Save';
                    Detail2 = 'กรุณายืนยันการบันทึกข้อมูล';

                    backgroundColorStyle = {
                        backgroundColor: theme.palette.secondary.light,
                      };

                    combinedStyles = [backgroundColorStyle, IconStyle];

                    return(
                        <Chip icon={<SaveOutlinedIcon 
                            fontSize="large" color={getColor()} />} 
                            sx={combinedStyles} />
                        
                    )
                case PopUpType.Exit:
                    Header2 = 'Exit';
                    Detail2 = 'กรุณายืนยันการออกจากหน้าจอนี้';

                    backgroundColorStyle = {
                        backgroundColor: theme.palette.warning.light,
                      };

                    combinedStyles = [backgroundColorStyle, IconStyle];

                    return(
                        <Chip icon={<ExitToAppOutlinedIcon 
                            fontSize="large" color={getColor()} />} 
                            sx={combinedStyles} />

                    )
            }
        }

        return(

           
                <Grid container spacing={2}>
                        <Stack spacing={2}>
                            { setIcon() }

                            <Typography gutterBottom variant="h6">
                                { Header2 }
                            </Typography>
                            <Typography >
                                { Detail2 }
                            </Typography>
                        </Stack>

                        <Grid item xs={12} lg={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt:2, mb:1 }}>
                            <DialogActions>
                                <Button variant="contained" color={getColor()} onClick={() => handlerConfirm()}
                                            sx={{ height: '35px', borderRadius: 50, width: 80 }} >
                                    OK
                                </Button>
                                <Button variant="contained" color="inherit" onClick={() => handlerCancel()}
                                            sx={{ height: '35px', borderRadius: 50, width: 80, ml:1 }} >
                                    Cancel
                                </Button>

                            </DialogActions>
                        </Grid>
                    </Grid>  
        )
    }

    return {isConfirm, Popup }
} 

export default PopupConfirm