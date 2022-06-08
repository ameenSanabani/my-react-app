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

const Dashboard = () => {
  const [msg, setMsg] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const { modeDark } = useSelector((state) => state.mode);
  const { user, seccess } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (seccess) {
      const getLog = async () => {
        const response = await axios.post(`/users/${user.id}`);
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
          marginInline: 'auto',
          textAlign: 'center',
          color: theme.palette.primary.light,
        }}
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ stiffness: 32, type: 'spring' }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            mt: theme.spacing,
            fontWeight: 'bold',
            ...(modeDark
              ? { color: theme.palette.text.primary }
              : { color: theme.palette.text.primary }),
          }}
        >
          Your DashBoard
        </Typography>
      </motion.div>
      <Grid container spacing={2}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}></Grid>
      </Grid>
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
