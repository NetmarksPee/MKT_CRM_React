import * as React from "react";
//import ListSubheader from '@mui/material/ListSubheader';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import SecurityIcon from "@mui/icons-material/Security";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import ChecklistIcon from "@mui/icons-material/Checklist";

import { useNavigate } from "react-router-dom";

export default function MenuPermission() {
  const [open, setOpen] = React.useState(true);

  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const navigateToUserGroup = () => {
    navigate("/UserGroup");
  };

  const navigatetoUser = () => {
    navigate("User");
  };

  const navigatetoUsergrouppermission = () => {
    navigate("/UserPermission");
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <SecurityIcon />
        </ListItemIcon>
        <ListItemText primary="Security" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={navigateToUserGroup}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Groups" />
          </ListItemButton>

          <ListItemButton
            sx={{ pl: 4 }}
            onClick={navigatetoUsergrouppermission}
          >
            <ListItemIcon>
              <ChecklistIcon />
            </ListItemIcon>
            <ListItemText primary="Group Permission" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={navigatetoUser}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
