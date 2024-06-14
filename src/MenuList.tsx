import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
//import InboxIcon from '@mui/icons-material/MoveToInbox';
//import DraftsIcon from '@mui/icons-material/Drafts';
//import SendIcon from '@mui/icons-material/Send';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
//import StarBorder from '@mui/icons-material/StarBorder';

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import BusinessIcon from "@mui/icons-material/Business";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import StorageIcon from "@mui/icons-material/Storage";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

export default function MenuList() {
  const [open, setOpen] = React.useState(true);

  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  // const navigateToCompanyCat = () => {
  //   navigate('/CompanyCategory');
  // }

  const parameterValue = { name: "TestName", id: 1 };

  const navigateToOtherPage = () => {
    //navigate('/Personal', { state: { parameterValue } });
    navigate("/AppMyGrid");
  };

  const navigateToActivityFlag = () => {
    navigate("/ActivityFlag");
  };

  const navigateToPersonal = () => {
    navigate("/Personal");
  };

  const navigateToCustomerList = () => {
    navigate("/CustomerList");
  };

  const navigateToCustomerIndustry = () => {
    navigate("/CustomerIndustry");
  };
  const navigateToSaleperson = () => {
    navigate("/Saleperson");
  };
  // const Back = () => {
  //   navigate('/')
  // }

  const navigateToHome = () => {
    navigate("/");
  };

  // const navigateToApp01 = () => {
  //   navigate('/App');
  // }

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          MENU
        </ListSubheader>
      }
    >
      <ListItemButton onClick={navigateToHome}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="Maintenance" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={navigateToCustomerList}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Customer" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={navigateToCustomerIndustry}>
            <ListItemIcon>
              <LocationCityIcon />
            </ListItemIcon>
            <ListItemText primary="Customer Industry" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={navigateToOtherPage}>
            <ListItemIcon>
              <WorkspacePremiumIcon />
            </ListItemIcon>
            <ListItemText primary="Project" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={navigateToPersonal}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Personal" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={navigateToActivityFlag}>
            <ListItemIcon>
              <LocalActivityIcon />
            </ListItemIcon>
            <ListItemText primary="Activity Flag" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={navigateToSaleperson}>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Saleperson" />
          </ListItemButton>
        </List>
      </Collapse>

      <Divider />
      <ListItemButton onClick={navigateToHome}>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Activity Record" />
      </ListItemButton>
    </List>
  );
}
