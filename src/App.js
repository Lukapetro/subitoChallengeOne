import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import { AppContext } from './context';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Footer from './components/Common/Footer';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepOne from './components/StepOne';
import StepThree from './components/StepThree';
import StepTwo from './components/StepTwo';
import Stepper from '@mui/material/Stepper';
import Success from './components/Success';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const steps = ['Step 1', 'Step 2', 'Step 3'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <StepOne />;
    case 1:
      return <StepTwo />;
    case 2:
      return <StepThree />;
    default:
      throw new Error('Unknown step');
  }
}

export default function App() {
  const { activeStep } = React.useContext(AppContext)

  return (
    <div>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Box
            component="img"
            sx={{
              height: 50,
              width: 150,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="Subito.it"
            src="https://assets.subito.it/static/logos/corporate-short.svg"
            loading="lazy"
          />
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Seminar Registration
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? <Success /> : (
              <React.Fragment>
                {getStepContent(activeStep)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Footer />
      </Container>
    </div>
  );
}