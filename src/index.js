import App from './App';
import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { StepsProvider } from './context';
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/Theme';

ReactDOM.render(
  <React.StrictMode>
    <StepsProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StepsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);