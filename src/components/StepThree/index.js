import * as React from 'react';

import { Box, Button, Checkbox } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { AppContext } from '../../context';
import Typography from '@mui/material/Typography';

export default function StepThree() {

  const { control, handleSubmit, watch } = useForm();
  const { handleNext } = React.useContext(AppContext)

  const rock = watch("rock");

  function onSubmit() {
    handleNext()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', alignItems: "center" }}>
          <Typography variant="h6">
            Are you ready to rock?
          </Typography>
          <Controller
            name="rock"
            control={control}
            rules={{ required: true }}
            render={({ field: props }) => (
              <Checkbox
                {...props}
                onChange={(e) => props.onChange(e.target.checked)}
              />
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            color="primary"
            disabled={!rock}
          >
            Complete Registration
          </Button>
        </Box>
      </form>
    </div>
  );
}