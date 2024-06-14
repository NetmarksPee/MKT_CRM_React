import React, { useState, useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import axios from "axios";

interface statuslst {
  status_group: string;
  status_index: number;
  status_code: string;
  description: string;
}

export default function comboStatusLst(props) {
  //const [selData, setData] = useState<statuslst[]>([]);

  const handleSelectChange = (event) => {
    // Call the parent function passed as a prop and pass the selected value
    props.onSelectChange(event.target.value);
    // this.props.selectedValue = event.target.value;
  };
  return (
    <div>
      <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
        <InputLabel id="lblStatus">Status</InputLabel>
        <Select
          labelId="selectStstusLabel"
          id="selectStatus"
          onChange={handleSelectChange}
          value={props.selectedValue}
          label="Status"
          // {...register('selData2.status')}
        >
          <MenuItem value={"A"}>
            <Chip label="Active" color="info" sx={{ width: "70px" }} />
          </MenuItem>
          <MenuItem value={"I"}>
            <Chip label="Inactive" color="default" sx={{ width: "70px" }} />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
