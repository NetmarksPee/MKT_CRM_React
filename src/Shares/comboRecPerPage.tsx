import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

class ComboRowPage extends React.Component {
   
    handleSelectChange = (event: { target: { value: unknown; }; }) => {
        // Call the parent function passed as a prop and pass the selected value
        this.props.onSelectChange(event.target.value);
        // this.props.selectedValue = event.target.value;
      }

    

    render() {
        return (
            <div>
              <FormControl variant="outlined" fullWidth sx={{ m: 1 }} >
                <InputLabel id="lblStatus">Show</InputLabel>
                <Select size="small"
                  labelId="selectRowPageLabel"
                  id="selectRowPage"
                  onChange={this.handleSelectChange}
                  value={this.props.selectedValue}
                  label="Show"

                >
                  <MenuItem value={1}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
              </div>
          );
    }
  }

export default ComboRowPage;