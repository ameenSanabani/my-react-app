import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

import Spinner from '../components/Spinner';
import SpinnerDark from '../components/SpinnerDark';

const UsersControl = () => {
  const [selected, setSelected] = useState([]);
  const [edit, setEdit] = useState(null);
  // eslint-disable-next-line
  const [editValue, setEditValue] = useState('');
  const [pending, setPending] = useState(false);

  const { user, isErorr, message } = useSelector((state) => state.auth);
  const { modeDark } = useSelector((state) => state.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (!user?.isAdmin) {
      navigate('/');
    }

    if (isErorr) {
      console.log(message);
    }

    const fitchUsers = async () => {
      const response = await axios('/users/all');

      setSelected(response.data);
    };

    fitchUsers();
    dispatch(reset());
  }, [user, isErorr, message, navigate, dispatch]);

  const rowUpdate = async () => {
    setPending(true);
    if (editValue) {
      const userUpd = {
        updateType: 'USER-UPDATE',
        _id: edit.id,
        data: {
          [edit.field]: editValue,
        },
      };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.put('/users/update', userUpd, config);
      const response = await axios('/users/all');

      setSelected(response.data);
      setEditValue('');
    }
    setPending(false);
  };

  const clumns = [
    {
      field: 'no',
      headerName: 'no',
      width: 20,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'id',
      headerName: '_id',
      width: 240,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 160,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      editable: true,
      // cellClassName: 'rowsTable',
    },
    {
      field: 'userId',
      headerName: 'userId',
      width: 120,
      // editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'group',
      headerName: 'group',
      width: 120,
      headerClassName: 'headerTable',
      // editable: true,
      headerAlign: 'left',
      // cellClassName: 'rowsTable',
    },

    {
      field: 'photo',
      headerName: 'photo',
      width: 200,
      editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'left',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'isAdmin',
      headerName: 'isAdmin',
      width: 80,
      editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'active',
      headerName: 'active',
      width: 80,
      editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 200,
      headerClassName: 'headerTable',
      headerAlign: 'left',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'updatedAt',
      headerName: 'Date Update',
      width: 200,
      headerClassName: 'headerTable',
      headerAlign: 'left',
      // cellClassName: 'rowsTable',
    },
  ];

  const rows = selected
    ? selected?.map((usr, index) => ({
        no: index + 1,
        id: usr?._id,
        name: usr?.name,
        userId: usr?.userId,
        group: usr?.group,
        photo: usr?.photo,
        isAdmin: usr?.isAdmin,
        active: usr?.active,
        createdAt: new Date(usr?.createdAt).toLocaleString('en-GB'),
        updatedAt: new Date(usr?.updatedAt).toLocaleString('en-GB'),
      }))
    : [];

  if (pending) {
    if (modeDark) {
      return <SpinnerDark />;
    } else {
      return <Spinner />;
    }
  }

  return (
    <>
      <Grid
        container
        spacing={1}
        width="100%"
        sx={{
          mt: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            maxWidth: '100%',
            textAlign: 'center',
            p: 3,
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h1" component="h1">
            معلومات مستخدمي النظام
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            minWidth: '95%',
            margin: 'auto',
            height: 467,
            '& .headerTable': {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              fontSize: '1.1rem',
            },
            '& .rowsTable': {
              bgcolor: theme.palette.background.default,
            },
            '& .rowsTable:nth-of-type(even)': {
              bgcolor: theme.palette.secondary.light,
            },
          }}
        >
          <DataGrid
            columns={clumns}
            rows={rows}
            // rowsPerPageOptions={[5]}
            // pageSize={5}
            getRowClassName={(params) => `rowsTable ${params.row}`}
            experimentalFeatures={{ newEditingApi: true }}
            onCellEditStop={(params, event) => {
              event.defaultMuiPrevented = true;
              setEdit(params);
              setEditValue(event.target.value);
              rowUpdate();
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default UsersControl;
