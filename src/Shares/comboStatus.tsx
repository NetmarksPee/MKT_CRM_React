import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

class ComboStatus extends React.Component {
   
    handleSelectChange = (event: { target: { value: unknown; }; }) => {
        // Call the parent function passed as a prop and pass the selected value
        this.props.onSelectChange(event.target.value);
        // this.props.selectedValue = event.target.value;
      }

    

    render() {
        //const { register } = this.props;

        
        return (
            <div>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }} >
                <InputLabel id="lblStatus">Status</InputLabel>
                <Select
                  labelId="selectStstusLabel"
                  id="selectStatus"
                  onChange={this.handleSelectChange}
                  value={this.props.selectedValue}
                  label="Status"
                  // {...register('selData2.status')}

                >
                  <MenuItem value={"A"}><Chip label="Active" color="info" sx={{width:'70px'}} /></MenuItem>
                  <MenuItem value={"I"}><Chip label="Inactive" color="default" sx={{width:'70px'}} /></MenuItem>
                </Select>
              </FormControl>
              </div>
          );
    }
  }

export default ComboStatus;