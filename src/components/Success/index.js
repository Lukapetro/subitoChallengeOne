import { Button, Typography } from "@mui/material";

import { AppContext } from "../../context";
import { Box } from "@mui/system";
import Emoji from "../Common/Emoji";
import React from 'react'

export default function Success() {
  const { handleReset } = React.useContext(AppContext)


  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Thanks for registering  <Emoji symbol="🎉" label="Party" />
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => handleReset()}
          variant="contained"
          sx={{ mt: 3 }}
        >
          Start Again
        </Button>
      </Box>
    </React.Fragment>
  )
};
