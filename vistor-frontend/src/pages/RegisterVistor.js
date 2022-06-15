import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  useTheme,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Upload } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { reset, vistorAdd } from '../features/vistor/vistorSlicer';
import Spinner from '../components/Spinner';
import SpinnerDark from '../components/SpinnerDark';

const RegisterVistor = () => {
  const [vistorI, setVistor] = useState({
    name: '',
    mobile: '',
    company: '',
    resone: '',
  });
  const [options, setOptions] = useState([]);

  // eslint-disable-next-line

  const { name, mobile, company, resone } = vistorI;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { vistor, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.vistors
  );
  const { modeDark } = useSelector((state) => state.mode);

  const theme = useTheme();

  const { user } = auth;

  const onChange = (e) => {
    setVistor((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (isError) {
      console.log(message);
    }

    if (isSuccess && vistor) {
      dispatch(reset());
      setVistor({
        name: '',
        mobile: '',
        company: '',
        resone: '',
      });
    }

    const getOption = async () => {
      const response = await axios('/api/vistors');
      setOptions(response.data);
    };

    getOption();
    dispatch(reset());
  }, [vistor, isError, isSuccess, message, dispatch, user, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const vistorInfo = {
      name,
      mobile: +mobile,
      resone,
      company,
    };

    if (name || mobile) {
      dispatch(vistorAdd(vistorInfo));
    } else {
      console.log('complate vistor info');
    }
  };

  const arr = options?.map((opt) => opt.name);
  const unicArr = [...new Set(arr)];
  const arrCompany = options?.map((opt) => opt.company);
  const unicArrCom = [...new Set(arrCompany)];

  if (isLoading) {
    if (modeDark) {
      return <SpinnerDark />;
    } else {
      return <Spinner />;
    }
  }

  return (
    <>
      <motion.div
        style={{
          mixWidth: '70%',
          margin: '15px auto',
          textAlign: 'center',
        }}
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ stiffness: 32, type: 'spring' }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontWeight: 'bold',
          }}
        >
          تسجيل زائر
        </Typography>
      </motion.div>
      <form onSubmit={onSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: 400,
            margin: '10px auto',
          }}
          bgcolor={theme.palette.background.default}
        >
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              value={name}
              onChange={onChange}
              freeSolo
              autoSelect
              options={unicArr}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: '100%' }}
                  name="name"
                  variant="filled"
                  label="اكتب اسم الزائر"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              sx={{ width: '100%' }}
              type="number"
              name="mobile"
              variant="filled"
              label="اكتب رقم تلفون الزائر"
              onChange={onChange}
              value={mobile}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ width: '100%' }}
              type="text"
              name="resone"
              variant="filled"
              label="اكتب ملاحظات واسباب الزيارة"
              onChange={onChange}
              value={resone}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              value={company}
              onChange={onChange}
              freeSolo
              autoSelect
              options={unicArrCom}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: '100%' }}
                  name="company"
                  variant="filled"
                  label="اكتب اسم شركة الزائر"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="small"
              type="submit"
              startIcon={<Upload />}
              sx={{ width: '100%', bgcolor: theme.palette.primary.main }}
              variant="contained"
            >
              تسجيل
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default RegisterVistor;
