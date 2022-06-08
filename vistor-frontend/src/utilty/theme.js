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
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepPurple,
          divider: deepPurple[700],
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
    borderRadius: 8,
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
