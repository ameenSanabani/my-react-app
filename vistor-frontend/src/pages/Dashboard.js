import {
  Button,
  Grid,
  IconButton,
  Snackbar,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import axios from 'axios';
import { Close } from '@mui/icons-material';

import { reset } from '../features/auth/authSlice';
const Chart = React.lazy(() => import('../components/Chart'));

const Dashboard = () => {
  const [msg, setMsg] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const { user, seccess } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (seccess) {
      const getLog = async () => {
        const response = await axios.post(`/users/${user._id}`);
        setMsg(response.data);
      };

      getLog();
      setOpen(true);
      dispatch(reset());
    }
  }, [dispatch, seccess, user]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        INFO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <motion.div
        style={{
          width: '70%',
          margin: '10px auto',
          textAlign: 'center',
        }}
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ stiffness: 32, type: 'spring' }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            marginBottom: theme.spacing(6),
            fontWeight: 'bold',
          }}
        >
          Your DashBoard
        </Typography>
      </motion.div>
      {/* <React.Suspense fallback={modeDark ? <SpinnerDark /> : <Spinner />}> */}
      <Grid container spacing={2} sx={{ padding: 3 }}>
        <Chart />
      </Grid>
      {/* </React.Suspense> */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={`اخر تسجيل دخول كان ${new Date(msg).toLocaleString('en-GB')}`}
        action={action}
      />
    </>
  );
};

export default Dashboard;
