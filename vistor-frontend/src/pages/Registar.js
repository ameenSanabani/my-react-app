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
} from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Add, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

import { strengthColor, strengthIndicator } from '../utilty/password-streng';

const Registar = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setshowPassword] = useState(false);
  const [showPassword1, setshowPassword1] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleClickShowPassword1 = () => {
    setshowPassword1(!showPassword1);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
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
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Create New User
        </Typography>
      </motion.div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Stack
          direction="column"
          sx={{ margin: '1rem auto', width: 300, gap: 2 }}
        >
          <TextField
            variant="outlined"
            {...register('name', {
              required: 'لايمكن عدم اضافة اسمك',
            })}
            label="اكتب اسمك كاملاً"
          />
          {errors.name && <Typography>{errors.name.message}</Typography>}
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
          {errors.userId && <Typography>{errors.userId.message}</Typography>}
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            value={password}
            name="password"
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value);
              changePassword(e.target.value);
            }}
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
          <OutlinedInput
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
            <Typography>{errors.password2.message}</Typography>
          )}
          <Button type="submit" startIcon={<Add />} variant="contained">
            submit
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Registar;
