import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import axios from "axios";
import React, { useEffect } from "react";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import { Container, CssBaseline, Paper } from "@mui/material";
//import { GridAddIcon } from "@mui/x-data-grid";

//import Select, { SelectChangeEvent } from '@mui/material/Select';

import ComboStatus from "../../Shares/comboStatus";
import ComboType from "../../Shares/comboType";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useForm } from "react-hook-form";

import moment from "moment";

// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

const UserGroupDetail = () => {
  const location = useLocation();
  const { parameterValue } = location.state;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      selData2: {
        user_group_code: " ",
        user_group_name: " ",
        user_group_description: " ",
        status: 0,
        create_date: new Date(),
        create_by: "Admin",
        update_date: new Date(),
        update_by: " ",
        scrmode: "new",
      },
    },
  });

  const callApi = async () => {
    if (parameterValue.scrmode === "edit") {
      const apiUrl =
        import.meta.env.VITE_CRM_API_URL + "usergroups/" + parameterValue.id;
      const res = await axios.get(apiUrl);
      const data_format = await res.data;

      reset({
        selData2: {
          user_group_code: data_format.user_group_code,
          user_group_name: data_format.user_group_name,
          user_group_description: data_format.user_group_description,
          status: data_format.status,
          create_date: data_format.create_date,
          create_by: data_format.create_by,
          update_by: data_format.update_by,
          update_date: data_format.update_date,
        },
      });
    } else {
      reset({
        selData2: {
          user_group_code: "",
          user_group_name: "",
          user_group_description: "",
          status: 0,
          create_date: new Date(),
          create_by: "Admin",
          update_by: "Admin",
          update_date: new Date(),
        },
      });
    }

    //setData2(data_format)
  };

  useEffect(() => {
    callApi();
  }, []);

  //   const [selData, setData2] = useState({
  //     id: 0, name: '', description: '',
  //     status: 0, type: 1,
  //     create_date: new Date(), create_by: "Admin",
  //     update_date: new Date(), update_by: "", scrmode: "new" });

  const validateCode = () => {
    return {
      ...register("selData2.user_group_code", {
        required: "User Group Code is required",
        maxLength: { value: 20, message: "Length cannot over 20 digits" },
      }),
    };
  };

  const validatename = () => {
    return {
      ...register("selData2.user_group_name", {
        required: "Name is required",
        maxLength: { value: 50, message: "Length cannot over 50 digits" },
      }),
    };
  };

  const validatedescription = () => {
    return {
      ...register("selData2.user_group_description", {
        required: "Desc is required",
        maxLength: { value: 200, message: "Lenght cannot over 200 digits" },
      }),
    };
  };

  const onSubmit = async (data: unknown) => {
    if (parameterValue.scrmode === "new") {
      // const ret =  JSON.stringify(data)
      // alert(ret);
      await Add(data);
    } else {
      // const ret =  JSON.stringify(data)
      // alert(ret);
      await Edit(data);
    }
    navigate("/UserGroup");
  };

  function BasicBreadcrumbs() {
    const scrPrefixName = parameterValue.scrmode === "new" ? "ADD" : "EDIT";

    const curr_page_name = scrPrefixName + " USER GROUP";

    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            <HomeIcon />
          </Link>
          <Link underline="hover" color="inherit" href="./UserGroup">
            USER GROUP LIST
          </Link>
          <Typography color="text.primary">{curr_page_name}</Typography>
        </Breadcrumbs>

        <Typography gutterBottom sx={{ fontWeight: "700" }}>
          {curr_page_name}
        </Typography>
      </div>
    );
  }

  // useEffect(() => {
  //     setData2(parameterValue);
  //   })

  async function Add(data) {
    const apiUrl = import.meta.env.VITE_CRM_API_URL + "usergroups/insert";
    console.log(data.selData2);
    const response = await axios.post(apiUrl, data.selData2, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log("Response:", response.data);
  }

  async function Edit(data) {
    const apiUrl = import.meta.env.VITE_CRM_API_URL + "usergroups/update";
    console.log(data.selData2);
    const response = await axios.post(apiUrl, data.selData2, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log("Response:", response.data);

    // const updatedObject = rows2.map((item) =>
    //   item.id === data.id ? data : item
    // );
  }

  const navigate = useNavigate();

  const back = () => {
    navigate("/UserGroup");
  };

  const handleSelectChange = (selectedOption) => {
    setValue("selData2.status", selectedOption);
    //setData2({ ...selData2, status: selectedOption });
    // alert(selectedOption + " - " + selData.status + " - " + selData.name);
  };

  const saveButton = () => {
    if (parameterValue.scrmode === "new") {
      return (
        <Button
          color="warning"
          type="submit"
          variant="contained"
          sx={{ width: "100px", borderRadius: 50 }}
        >
          Add
        </Button>
      );
    } else {
      return (
        <Button
          color="success"
          type="submit"
          variant="contained"
          sx={{ width: "100px", borderRadius: 50 }}
        >
          Save
        </Button>
      );
    }
  };

  const UpdateDateDisp = () => {
    try {
      return format(watch().selData2.update_date, "dd-MM-yyyy HH:mm");
    } catch {
      return "";
    }
  };

  const srceenmode = () => {
    if (parameterValue.scrmode === "new") return false;
    else return true;
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <BasicBreadcrumbs />
        <Paper sx={{ mt: 3, borderRadius: 5 }}>
          {/* <p>{parameterValue.name}</p>
                    <p>{parameterValue.description}</p>
                    <p>{parameterValue.id}</p>
                    <p>{parameterValue.status}</p> */}

          <Box
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6} sx={{ mt: 1 }}>
                <Stack sx={{ m: 3 }} direction="column" spacing={2}>
                  <TextField
                    fullWidth
                    required
                    {...validateCode()}
                    id="txtID"
                    label="User Group Code"
                    margin="normal"
                    error={!!errors.selData2?.user_group_code}
                    helperText={
                      errors.selData2?.user_group_code
                        ? errors.selData2.user_group_code.message
                        : ""
                    }
                    variant="standard"
                    disabled={srceenmode()}
                  />

                  <TextField
                    fullWidth
                    required
                    {...validatename()}
                    id="txtName"
                    label="Name"
                    margin="normal"
                    error={!!errors.selData2?.user_group_name}
                    helperText={
                      errors.selData2?.user_group_name
                        ? errors.selData2.user_group_name.message
                        : ""
                    }
                    variant="standard"
                  />

                  <TextField
                    fullWidth
                    id="txtDesc"
                    label="Description"
                    margin="normal"
                    {...validatedescription()}
                    error={!!errors.selData2?.user_group_description}
                    helperText={
                      errors.selData2?.user_group_description
                        ? errors.selData2.user_group_description.message
                        : ""
                    }
                    multiline
                    variant="standard"
                  />

                  <ComboStatus
                    onSelectChange={handleSelectChange}
                    selectedValue={watch().selData2.status}
                    // selectedValue={...register('selData2.')}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} lg={6} sx={{ mt: 1 }}>
                <Stack sx={{ m: 3 }} direction="column" spacing={2}>
                  <Grid container>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        disabled
                        inputProps={{ readOnly: true }}
                        id="txtCreateDate"
                        label="Created Date"
                        value={format(
                          watch().selData2.create_date,
                          "dd/MM/yyyy HH:mm"
                        )}
                        // value={format(selData.create_date, "dd/MM/yyyy HH:mm")}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={5} sx={{ ml: 1 }}>
                      <TextField
                        fullWidth
                        disabled
                        inputProps={{ readOnly: true }}
                        id="txtCreateBy"
                        label="Created By"
                        {...register("selData2.create_by")}
                        // value={selData.create_by}
                        variant="standard"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        disabled
                        inputProps={{ readOnly: true }}
                        id="txtUpdateDate2"
                        label="Updated Date"
                        value={UpdateDateDisp()}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={5} sx={{ ml: 1 }}>
                      <TextField
                        fullWidth
                        disabled
                        inputProps={{ readOnly: true }}
                        id="txtUpdateBy2"
                        label="Update By"
                        {...register("selData2.update_by")}
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ m: 3 }}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  {saveButton()}

                  <Button
                    color="inherit"
                    variant="contained"
                    sx={{ width: "100px", borderRadius: 50 }}
                    onClick={() => {
                      back();
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default UserGroupDetail;
