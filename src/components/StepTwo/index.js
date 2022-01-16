import * as yup from "yup";

import { Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import React, { useContext } from 'react';

import { AppContext } from '../../context';
import { Box } from '@mui/system';
import ErrorText from "../Common/ErrorText";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object({
  companyName: yup.string().required('Required field'),
  companyNameString: yup.string().when('companyName', {
    is: "Yes",
    then: yup.string().required('Company name is required')
  }),
  accommodations: yup.string().required('Required field'),
}).required();

export default function StepTwo() {
  const { handleNext } = useContext(AppContext)

  const { register, watch, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const companyName = watch("companyName");

  function onSubmit() {
    handleNext()
  }

  return (
    <div style={{ padding: 16, maxWidth: 600 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl component="fieldset">
          <Typography variant="h6" gutterBottom>
            Would you like your company name on your badges?
          </Typography>
          <Controller
            rules={{ required: true }}
            control={control}
            name="companyName"
            render={({ field }) => {
              return (
                <Box>
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  <ErrorText text={errors.companyName?.message} />
                </Box>
              );
            }}
          />
        </FormControl>
        {companyName === "Yes" &&
          <Box >
            <Typography variant="subtitle2">Company Name</Typography>
            <Controller
              rules={{ required: true }}
              control={control}
              {...register('companyNameString')}
              render={({ field }) => <TextField
                name={'companyNameString'}
                size="small"
                fullWidth
                variant="outlined"
                {...field}
                {...register('companyNameString')}
              />}
            />
            <ErrorText text={errors.companyNameString?.message} />
          </Box>
        }
        <FormControl component="fieldset" sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Will anyone in your group require special accommodations?
          </Typography>
          <Controller
            rules={{ required: true }}
            control={control}
            name="accommodations"
            render={({ field }) => {
              return (
                <Box>
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  <ErrorText text={errors.accommodations?.message} />
                </Box>
              );
            }}
          />
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            color="primary"
          >
            Next
          </Button>
        </Box>
      </form>
    </div>
  );
}
