import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TitleIcon from '@mui/icons-material/Title';

class ComboType extends React.Component {
   
    handleSelectChange = (event: { target: { value: unknown; }; }) => {
        // Call the parent function passed as a prop and pass the selected value
        this.props.onSelectChange(event.target.value);
        // this.props.selectedValue = event.target.value;
      }

    

    render() {
        return (
            <div>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }} >
                <InputLabel id="lblStatus">Type</InputLabel>
                <Select
                  labelId="selectStstusLabel"
                  id="selectStatus"
                  onChange={this.handleSelectChange}
                  value={this.props.selectedValue}
                  label="Type"

                >
                  <MenuItem value={1}><TitleIcon /> : Text</MenuItem>
                  <MenuItem value={2}><CheckBoxIcon /> : Check</MenuItem>
                </Select>
              </FormControl>
              </div>
          );
    }
  }

export default ComboType;