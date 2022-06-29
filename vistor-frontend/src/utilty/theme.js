import { amber, grey, deepPurple } from '@mui/material/colors';

const getDesignTokens = (mode) => ({
  direction: 'ltr',
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          secondary: {
            main: '#f3f3f3',
            light: '#f8f8f8',
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepPurple,
          divider: deepPurple[700],
          secondary: {
            main: deepPurple[900],
            light: deepPurple[700],
          },
          background: {
            default: deepPurple[800],
            paper: deepPurple[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
  spacing: 6,
  mixins: {
    toolbar: {
      maxHeight: 56,
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    h6: {
      fontWeight: 500,
      fontSize: '0.75rem',
    },
    h5: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h1: {
      fontSize: '2.125rem',
      fontWeight: 700,
    },
  },
  // components: {
  //   MuiPaper: {
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: '#333',
  //       },
  //     },
  //   },
  // },
});

export default getDesignTokens;
