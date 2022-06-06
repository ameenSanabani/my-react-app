import { createTheme } from '@mui/material';

const mode = localStorage.getItem('mode') === 'ON' ? 'dark' : 'light';

const theme = createTheme({
  direction: 'ltr',
  palette: {
    mode: mode ? mode : 'light',
    primary: {
      main: '#333',
      dark: '#121212',
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
