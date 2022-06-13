import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useTheme,
  FormControl,
  Grid,
  Box,
  styled,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { PersonAdd, Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { strengthColor, strengthIndicator } from '../utilty/password-streng';
import { reset as resetUser, registerUser } from '../features/auth/authSlice';

const PragrafErr = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.error,
}));

const Registar = () => {
  // eslint-disable-next-line
  const [showPassword, setshowPassword] = useState(false);
  const [showPassword1, setshowPassword1] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getValues,
  } = useForm();
  const dispatch = useDispatch();

  const { user, loading, seccess, isError, message } = useSelector(
    (state) => state.auth
  );
  // const { modeDark } = useSelector((state) => state.mode);

  React.useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (seccess) {
      dispatch(resetUser());
    }
  }, [user, loading, seccess, isError, message, dispatch]);

  React.useEffect(() => {
    const subscription = watch((data) => {
      const temp = strengthIndicator(data.password);
      setStrength(temp);
      setLevel(strengthColor(temp));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleClickShowPassword1 = () => {
    setshowPassword1(!showPassword1);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    const { name, password, password2, userId } = data;

    if (password === password2) {
      const data = {
        name,
        userId,
        password,
      };
      dispatch(registerUser(data));

      reset({
        ...getValues,
        name: '',
        userId: '',
        password: '',
        password2: '',
      });
    }
  };

  return (
    <>
      <motion.div
        style={{
          mixWidth: '70%',
          margin: '10px auto',
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
          سجل مستخدم جديد
        </Typography>
      </motion.div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="column"
          sx={{
            margin: '1rem auto',
            width: 300,
            gap: 3,
          }}
        >
          <TextField
            sx={{ mt: { xs: theme.spacing(3), sm: 0 } }}
            variant="outlined"
            {...register('name', {
              required: 'لايمكن عدم اضافة اسمك',
            })}
            label="اكتب اسمك كاملاً"
          />
          {errors.name && <PragrafErr>{errors.name.message}</PragrafErr>}
          <TextField
            sx={{ mt: { xs: theme.spacing(3), sm: 0 } }}
            variant="outlined"
            {...register('userId', {
              required: 'اكتب المعرف الخاص بك',
              minLength: {
                value: 4,
                message: 'لايقل عدد حروف المعرف عن ٤',
              },
            })}
            label="اكتب المعرف الخاص بك"
          />
          {errors.userId && <PragrafErr>{errors.userId.message}</PragrafErr>}
          <OutlinedInput
            sx={{ mt: { xs: theme.spacing(3), sm: 0 } }}
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'لابد من كتابة كلمة السر',
              minLength: {
                value: 6,
                message: 'اقل عدد حروف هو ٦',
              },
            })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ width: 20 }} />
                  ) : (
                    <Visibility sx={{ width: 20 }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            placeholder="اكتب كلمة السر الخاصة بك"
          />
          {strength !== 0 && (
            <FormControl fullWidth>
              <Box sx={{ m: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box
                      style={{ backgroundColor: level?.color }}
                      sx={{ width: 85, height: 8, borderRadius: '7px' }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </FormControl>
          )}
          {errors.password && (
            <PragrafErr>{errors.password.message}</PragrafErr>
          )}
          <OutlinedInput
            sx={{ mt: { xs: theme.spacing(3), sm: 0 } }}
            type={showPassword1 ? 'text' : 'password'}
            {...register('password2', { required: 'اعد كتابة كلمة السر' })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword1}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword1 ? (
                    <VisibilityOff sx={{ width: 20 }} />
                  ) : (
                    <Visibility sx={{ width: 20 }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            placeholder="تاكيد كلمة السر"
          />
          {errors.password2 && (
            <PragrafErr>{errors.password2.message}</PragrafErr>
          )}
          <Button
            sx={{ mt: { xs: theme.spacing(4), sm: 0 } }}
            type="submit"
            startIcon={<PersonAdd />}
            variant="contained"
          >
            submit
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Registar;
