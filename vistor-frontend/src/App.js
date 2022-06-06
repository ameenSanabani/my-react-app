import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Registar from './pages/Registar';
import theme from './utilty/theme';
import Spinner from './components/Spinner';
import SpinnerDark from './components/SpinnerDark';

function App() {
  const { loading } = useSelector((state) => state.auth);
  const { modeDark } = useSelector((state) => state.mode);

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
          <Route path="/registar" element={<Registar />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
