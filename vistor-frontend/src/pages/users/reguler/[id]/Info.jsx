import axios from 'axios';
import {
  Alert,
  Box,
  Button,
  Fab,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Update,
  Visibility,
  VisibilityOff,
  AddPhotoAlternate,
} from '@mui/icons-material';

import {
  changPassword,
  reset,
  updateInfo,
} from '../../../../features/auth/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../../../components/Spinner';
import SpinnerDark from '../../../../components/SpinnerDark';
import {
  strengthColor,
  strengthIndicator,
} from '../../../../utilty/password-streng';

const Info = () => {
  const [pass, setPass] = useState({
    oldpass: '',
    newpass: '',
    confpass: '',
  });
  const [passOpen, setPassOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  // eslint-disable-next-line
  const [showPassword, setshowPassword] = useState(false);
  const [showPassword2, setshowPassword2] = useState(false);
  const [showPassword3, setshowPassword3] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  // eslint-disable-next-line
  const [upload, setUpload] = useState({
    file: null,
    filename: '',
  });
  const [name, setName] = useState('');

  const { oldpass, newpass, confpass } = pass;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const router = useParams();

  const { user, isErorr, loading, seccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setPass((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const openInfoUpd = () => {
    dispatch(reset());
    setPassOpen(false);
    setInfoOpen(!infoOpen);
  };

  useEffect(() => {
    if (router?.userId !== user?._id) {
      navigate('/');
    }

    if (seccess && user) {
      dispatch(reset());
      navigate('/');
    }
    setName(user?.name);
  }, [user, isErorr, seccess, message, navigate, dispatch, router]);

  const onSubmitPass = (e) => {
    e.preventDefault();

    if (oldpass || newpass || confpass) {
      if (newpass === confpass) {
        const passwordEdit = {
          updateType: 'CHANGE-Password',
          _id: user._id,
          data: {
            oldpass,
            newpass,
          },
        };

        dispatch(changPassword(passwordEdit));
      }
    }
  };

  const controlPass = () => {
    dispatch(reset());
    setInfoOpen(false);
    setPassOpen(!passOpen);
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleClickShowPassword2 = () => {
    setshowPassword2(!showPassword2);
  };

  const handleClickShowPassword3 = () => {
    setshowPassword3(!showPassword3);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const upladFile = (e) => {
    setUpload(() => ({
      file: e.target.files[0],
      filename: e.target.files[0].name,
    }));
  };

  const updatInfo = async (e) => {
    e.preventDefault();

    if (upload.file) {
      const formData = new FormData();
      formData.append('file', upload.file);
      formData.append('updateType', 'UPLOAD-IMAG');

      try {
        const response = await axios.put('/users/update', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          },
        });

        // eslint-disable-next-line
        const { fileName, filePath } = response.data;

        if (filePath) {
          const userUpd = {
            updateType: 'USER-UPDATE',
            _id: user._id,
            data: {
              name,
              photo: filePath,
            },
          };

          dispatch(updateInfo(userUpd));
        }
      } catch (error) {
        if (error.response.status === 500) {
          console.log('no server hundle storage');
          console.log(message);
        }
      }
    } else {
      const nameUpd = {
        updateType: 'USER-UPDATE',
        _id: user._id,
        data: {
          name,
        },
      };

      dispatch(updateInfo(nameUpd));
    }
  };

  const { modeDark } = useSelector((state) => state.mode);

  if (loading) {
    if (modeDark) {
      return <SpinnerDark />;
    } else {
      return <Spinner />;
    }
  }

  return (
    <>
      <Grid
        sx={{
          width: '90%',
          margin: '1rem auto',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Button
          onClick={controlPass}
          sx={{
            color: 'text.primary',
            '&:hover': { textDecoration: 'underLine' },
          }}
        >
          Change PassWord
        </Button>
        <Button
          onClick={openInfoUpd}
          sx={{
            color: 'text.primary',
            '&:hover': { textDecoration: 'underLine' },
          }}
        >
          update information
        </Button>
      </Grid>
      {isErorr && <Alert severity="error">{message}</Alert>}
      {infoOpen && (
        <form onSubmit={updatInfo}>
          <Grid
            sx={{
              margin: '3rem auto',
              maxWidth: { xs: 300, sm: 400 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              sx={{ width: '100%' }}
              type="text"
              name="name"
              variant="filled"
              label="عدل اسمك"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              style={{ display: 'none' }}
              type="file"
              onChange={upladFile}
            />
            <label htmlFor="contained-button-file">
              <Fab component="span">
                <AddPhotoAlternate />
              </Fab>
            </label>
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ width: '100%' }}
              startIcon={<Update />}
            >
              update
            </Button>
          </Grid>
        </form>
      )}
      {passOpen && (
        <form onSubmit={onSubmitPass}>
          <Grid
            sx={{
              margin: '3rem auto',
              maxWidth: { xs: 300, sm: 400 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              value={oldpass}
              name="oldpass"
              onChange={onChange}
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
              placeholder="الباسورد القديم"
            />
            <OutlinedInput
              type={showPassword2 ? 'text' : 'password'}
              value={newpass}
              name="newpass"
              onChange={(e) => {
                onChange(e);
                changePassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword2 ? (
                      <VisibilityOff sx={{ width: 20 }} />
                    ) : (
                      <Visibility sx={{ width: 20 }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="الباسورد الجديد"
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
              type={showPassword3 ? 'text' : 'password'}
              value={confpass}
              name="confpass"
              onChange={onChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword3}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword3 ? (
                      <VisibilityOff sx={{ width: 20 }} />
                    ) : (
                      <Visibility sx={{ width: 20 }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="تاكيد الباسورد الجديد"
            />
            <Button
              size="small"
              type="submit"
              variant="contained"
              startIcon={<Update />}
            >
              update
            </Button>
          </Grid>
        </form>
      )}
    </>
  );
};

export default Info;
