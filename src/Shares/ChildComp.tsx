import React from 'react';
//import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// const [status, setStatus] = React.useState('0');

// const handleChange = (event: SelectChangeEvent) => {
//     //row.status = event.target.value;
//     setStatus(event.target.value as string);
//     //status = event.target.value;
//     //this.props.onChange(status)
//     //onStatus();
//   };


class ChildComponent extends React.Component {
   
    handleSelectChange = (event) => {
        // Call the parent function passed as a prop and pass the selected value
        this.props.onSelectChange(event.target.value);
      }

    render() {
        return (
            <div>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }} >
                <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                <Select
                  labelId="selectStstusLabel"
                  id="selectStatus"
                  onChange={this.handleSelectChange}
                  label="Status"
                >
                  <MenuItem value={0}>Active</MenuItem>
                  <MenuItem value={1}>Inactive</MenuItem>
                </Select>
              </FormControl>
              </div>
          );
    }
  }


// class ChildComponent extends React.Component {
//   render() {
//     return (
//       <div>
//         {/* Use the passed function onClick and parameter when the button is clicked */}
//         <Button onClick={() => this.props.onClick(this.props.message)}>{this.props.message}</Button>
//       </div>
//     );
//   }
// }

export default ChildComponent;