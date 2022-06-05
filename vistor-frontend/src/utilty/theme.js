import { createTheme } from '@mui/material';

const theme = createTheme({
  direction: 'ltr',
  palette: {
    mode: 'light',
    primary: {
      main: '#333',
      dark: '#fff',
      light: '#1960a5',
      error: 'red',
    },
    secondary: {
      main: '#fff',
      dark: '#030303',
      light: 'skyblue',
      error: '#f06f6f',
    },
  },
});

export default theme;
