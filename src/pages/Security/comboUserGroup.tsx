import React, { useState, useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import axios from "axios";

export default function ComboUserGroup(props) {
  const [selData, setData] = useState([
    {
      user_group_code: 0,
      user_group_name: "",
      user_group_description: "",
      status: 0,
      create_date: new Date(),
      create_by: "Admin",
      update_date: new Date(),
      update_by: "",
      scrmode: "new",
    },
  ]);
  const [valData, setVal] = useState("");

  const callApi = async () => {
    const apiUrl = import.meta.env.VITE_CRM_API_URL + "usergroups";
    const res = await axios.get(apiUrl);
    const data_format = await res.data;

    setData(data_format);
  };

  const handleSelectChange = (event) => {
    // Call the parent function passed as a prop and pass the selected value
    props.onSelectChange(event.target.value);
    setVal(event.target.value);
    // this.props.selectedValue = event.target.value;
  };
  //const { register } = this.props;
  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
      <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
        <InputLabel id="lblUserGroup">UserGroup</InputLabel>
        <Select
          labelId="selectUserGroupLabel"
          id="selectUserGroupPage"
          onChange={handleSelectChange}
          value={props.selectedValue}
          label="UserGroup"
          // {...register('selData2.status')}
        >
          {selData.map((data, i) => {
            return (
              <MenuItem key={i} value={data.user_group_code}>
                {data.user_group_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
