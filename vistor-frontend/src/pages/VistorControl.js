// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { getVistor, delVistor } from '../features/vistor/vistorSlicer';
import Spinner from '../components/Spinner';
import SpinnerDark from '../components/SpinnerDark';

const VistorControl = () => {
  const [selected, setSelected] = useState([]);
  const [groups, setGroups] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { vistor, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.vistors
  );
  const { modeDark } = useSelector((state) => state.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    dispatch(getVistor());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const authorte = () => {
        user.group.map((itm) => {
          if (+itm === 3) {
            return setGroups(true);
          } else {
            return null;
          }
        });
      };

      authorte();
    }

    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }
  }, [user, vistor, isError, isSuccess, message, dispatch, navigate, groups]);

  const clumns = [
    {
      field: 'no',
      headerName: 'No',
      width: 20,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'company',
      headerName: 'Company',
      width: 200,
      // editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'mobile',
      headerName: 'Mobile',
      width: 120,
      headerClassName: 'headerTable',
      headerAlign: 'left',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'resone',
      headerName: 'Resone',
      width: 200,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 180,
      headerClassName: 'headerTable',
      headerAlign: 'left',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'id',
      headerName: 'id',
      width: 250,
      sortable: false,
      headerClassName: 'headerTable',
      headerAlign: 'left',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'user',
      headerName: 'user',
      width: 250,
      sortable: false,
      headerClassName: 'headerTable',
      headerAlign: 'left',
      // cellClassName: 'rowsTable',
    },
  ];

  const rows = vistor
    ? vistor?.map((vist, index) => ({
        no: index + 1,
        name: vist?.name,
        company: vist?.company,
        mobile: vist?.mobile,
        resone: vist?.resone,
        createdAt: new Date(vist?.createdAt).toLocaleString('en-GB'),
        id: vist?._id,
        user: vist?.user,
      }))
    : [];

  const deleteVistor = () => {
    // eslint-disable-next-line
    if (confirm('are you shore to delete?')) {
      dispatch(delVistor(selected));
    }
  };

  if (isLoading) {
    if (modeDark) {
      return <SpinnerDark />;
    } else {
      return <Spinner />;
    }
  }

  return (
    <Grid
      container
      spacing={1}
      width="100%"
      sx={{
        marginTop: '2rem',
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
          justifyContent: { xs: 'space-around', sm: 'center' },
          alignItems: 'center',
        }}
      >
        <Typography variant="h1" component="h1">
          معلومات عن الزائرين
        </Typography>

        <Button
          onClick={deleteVistor}
          sx={{ bgcolor: 'red' }}
          variant="contained"
          size="small"
        >
          Delete
        </Button>
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
          getRowClassName={(params) => `rowsTable ${params.row}`}
          components={{ Toolbar: GridToolbar }}
          autoPageSize={true}
          onSelectionModelChange={(params) => setSelected(params)}
          // rowsPerPageOptions={[5]}
          checkboxSelection
          isRowSelectable={(params) =>
            groups ? params.row.user !== 1 : params.row.user === user?.id
          }
        />
      </Grid>
    </Grid>
  );
};

export default VistorControl;
