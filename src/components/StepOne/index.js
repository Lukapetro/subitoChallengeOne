import * as Yup from 'yup';

import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import React, { useContext } from "react";

import { AppContext } from '../../context';
import ErrorText from '../Common/ErrorText';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
  attendees: Yup.number().required(),
  candidates: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Name is required'),
    })
  )
});

export default function StepOne() {
  const { handleNext } = useContext(AppContext)

  const { register, control, handleSubmit, watch, formState: { errors }, } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const { fields, append, remove } = useFieldArray({ name: 'candidates', control });

  const attendees = watch('attendees');

  useEffect(() => {
    const newVal = parseInt(attendees || 1);
    const oldVal = fields.length;
    if (newVal > oldVal) {
      for (let i = oldVal; i < newVal; i++) {
        append({ name: '' });
      }
    } else {
      for (let i = oldVal; i > newVal; i--) {
        remove(i - 1);
      }
    }
  }, [attendees, append, fields.length, remove]);

  function onSubmit() {
    handleNext()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", mb: 2, alignItems: "center" }}>
          <Typography variant="h6" gutterBottom sx={{ flex: 1 }}>
            How many people will be attending?
          </Typography>
          <Controller
            name="attendees"
            {...register('attendees')}
            control={control}
            render={({ field }) => (
              <Select
                size='small'
                defaultValue={1}
                sx={{ width: 100 }}
                {...register('attendees')}
                name="attendees"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            )}
          />
        </Box>

        <Typography variant="h6" gutterBottom>
          Please provide full names:
        </Typography>
        {fields.map((item, i) => (
          <Box sx={{ mb: 2 }} key={i}>
            <Typography variant="subtitle2">Attendee {i + 1} Name</Typography>
            <Controller
              control={control}
              {...register(`candidates.${i}.name`)}
              render={({ field }) => <TextField
                name={`candidates[${i}]name`}
                size="small"
                fullWidth
                variant="outlined"
                {...field}
                {...register(`candidates.${i}.name`)}
              />}
            />
            {errors.candidates?.[i]?.name && <ErrorText text={'Name required'} />}
          </Box>
        ))}
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
    </>
  );
}