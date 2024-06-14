import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
        name: '',
        email: ''
    }
  });

  const onSubmit = (data: unknown) => {
    const ret =  JSON.stringify(data)
    alert(ret);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          label="Name"
          {...register('name', { required: 'Name is required' })}
          error={!!errors?.name}
          helperText={errors?.name ? errors.name.message : ''}
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <TextField
          label="Email"
          {...register('email', { required: 'Email is required' })}
          error={!!errors?.email}
          helperText={errors?.email ? errors.email.message : ''}
          fullWidth
          margin="normal"
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default MyForm;
