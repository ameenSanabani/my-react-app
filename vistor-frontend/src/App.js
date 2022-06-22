import * as React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/Layout';
import {
  Dashboard,
  Error,
  Registar,
  UsersControl,
  Login,
  VistorControl,
  RegisterVistor,
} from './pages';
import getDesignTokens from './utilty/theme';
import Spinner from './components/Spinner';
import SpinnerDark from './components/SpinnerDark';
import Info from './pages/users/reguler/[id]/Info';

function App() {
  const { loading } = useSelector((state) => state.auth);
  const { modeDark } = useSelector((state) => state.mode);

  // Update the theme only if the mode changes
  const theme = React.useMemo(
    () => createTheme(getDesignTokens(modeDark ? 'dark' : 'light')),
    [modeDark]
  );

  if (loading) {
    if (modeDark) {
      return <SpinnerDark />;
    } else {
      return <Spinner />;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/default" element={<Dashboard />} />
          <Route path="/registar" element={<Registar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UsersControl />} />
          <Route path="/vistors" element={<RegisterVistor />} />
          <Route path="/vistorscontrol" element={<VistorControl />} />
          <Route path="/users/:userId" element={<Info />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
