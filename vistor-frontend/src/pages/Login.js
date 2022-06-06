import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useTheme,
  styled,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Add, Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../features/auth/authSlice';

const PragrafErr = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.error,
}));

const Login = () => {
  // eslint-disable-next-line
  const [showPassword, setshowPassword] = useState(false);

  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const { user, loading, seccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const { modeDark } = useSelector((state) => state.mode);
  const navigator = useNavigate();

  React.useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (seccess) {
      navigator('/');
    }
  }, [user, loading, seccess, isError, message, dispatch, navigator]);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    const { password, userId } = data;

    if (userId.length > 0) {
      const data = {
        userId,
        password,
      };
      dispatch(loginUser(data));
    }
  };

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
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            ...(modeDark && { color: theme.palette.secondary.main }),
          }}
        >
          تسجيل الدخول
        </Typography>
      </motion.div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="column"
          sx={{ margin: '1rem auto', width: 300, gap: 3 }}
        >
          <TextField
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
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'اكتب كلمة السر' })}
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
            placeholder="اكتب كلمة السر"
          />
          {errors.password && (
            <PragrafErr>{errors.password.message}</PragrafErr>
          )}
          <Button type="submit" startIcon={<Add />} variant="contained">
            submit
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Login;
