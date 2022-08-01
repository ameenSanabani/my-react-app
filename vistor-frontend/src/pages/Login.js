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
  Alert,
  Grid,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { LoginOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
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

  const { user, loading, seccess, isErorr, message } = useSelector(
    (state) => state.auth
  );
  // const { modeDark } = useSelector((state) => state.mode);
  const navigator = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigator('/');
    }

    if (seccess) {
      navigator('/');
    }
  }, [user, loading, seccess, message, navigator]);

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
    <Grid
      sx={{
        width: '100%',
        height: '90vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Grid
        sx={{
          width: 350,
          height: 350,
          bgcolor: theme.palette.secondary.main,
          borderRadius: theme.shape.borderRadius,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Grid width="100%">
          <motion.div
            style={{
              mixWidth: '70%',
              marginInline: 'auto',
              marginBottom: 2,
              textAlign: 'center',
            }}
            initial={{ y: -300 }}
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
              تسجيل الدخول
            </Typography>
          </motion.div>
          <Divider sx={{ marginBlock: 2 }} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              direction="column"
              sx={{ margin: '0 auto', width: 300, gap: 3 }}
            >
              {isErorr && <Alert severity="error">{message}</Alert>}
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
              {errors.userId && (
                <PragrafErr>{errors.userId.message}</PragrafErr>
              )}
              <OutlinedInput
                sx={{ mt: { xs: theme.spacing(3), sm: 0 } }}
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
              <Button
                type="submit"
                startIcon={<LoginOutlined />}
                variant="contained"
                sx={{ mt: { xs: theme.spacing(4), sm: 0 } }}
              >
                login
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
