import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, useTheme } from '@mui/material';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import axios from 'axios';

import { productUpd } from '../features/products/productSlicer';
import Spinner from '../components/Spinner';
import SpinnerDark from '../components/SpinnerDark';

const ProductControl = () => {
  const [selected, setSelected] = useState([]);
  const [edit, setEdit] = useState(null);
  // eslint-disable-next-line
  const [editValue, setEditValue] = useState('');
  const [pending, setPending] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { products, isErrorPr, isLoadingPr, messagePr } = useSelector(
    (state) => state.products
  );
  const { modeDark } = useSelector((state) => state.mode);

  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (isErrorPr) {
      console.log(messagePr);
    }

    if (products) {
      setSelected(products);
    } else {
      const fitchProducts = async () => {
        setPending(true);
        const response = await axios('/api/product/');

        setSelected(response.data);
        setPending(false);
      };

      fitchProducts();
    }
  }, [user, isErrorPr, products, messagePr, navigate]);

  const rowUpdate = () => {
    if (editValue) {
      const productsUpd = {
        _id: edit.id,
        data: {
          [edit.field]: editValue,
        },
      };
      dispatch(productUpd(productsUpd));
    }
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
      width: 200,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'product',
      headerName: 'Product Name',
      width: 120,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      editable: true,
      // cellClassName: 'rowsTable',
    },
    {
      field: 'display',
      headerName: 'Display',
      width: 75,
      editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 120,
      headerClassName: 'headerTable',
      editable: true,
      headerAlign: 'left',
      // cellClassName: 'rowsTable',
    },

    {
      field: 'brand',
      headerName: 'Brand',
      width: 75,
      editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'model',
      headerName: 'Model',
      width: 75,
      editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'units',
      headerName: 'Units',
      width: 75,
      editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'specialCode',
      headerName: 'Special Code',
      width: 75,
      editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'barcode',
      headerName: 'Barcode',
      width: 70,
      editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'explanation',
      headerName: 'Explanation',
      width: 200,
      editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'left',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'content',
      headerName: 'Content',
      width: 100,
      editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'documents',
      headerName: 'Documents',
      width: 100,
      editable: true,
      headerClassName: 'headerTable',
      headerAlign: 'center',
      // cellClassName: 'rowsTable',
    },
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      //   editable: true,
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
    ? selected?.map((prod, index) => ({
        no: index + 1,
        id: prod?._id,
        product: prod?.product,
        display: prod?.display,
        category: prod?.category,
        brand: prod?.brand,
        model: prod?.model,
        units: prod?.units,
        specialCode: prod?.specialCode,
        barcode: prod?.barcode,
        explanation: prod?.explanation,
        content: prod?.content,
        documents: prod?.documents,
        user: prod?.user,
        createdAt: new Date(prod?.createdAt).toLocaleString('en-GB'),
        updatedAt: new Date(prod?.updatedAt).toLocaleString('en-GB'),
      }))
    : [];

  const authorty = (params) => {
    let result;

    for (let i = 0; i < user?.group.length; i++) {
      const itm = user?.group[i];
      if (+itm === 3) {
        result = params.row.user !== 1;
      }
      if (+itm === 2) {
        result = params.row.user === user?._id;
      }
      if (+itm === 1) {
        result = params.row.user === 1;
      }
    }

    return result;
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton sx={{ color: theme.palette.text.primary }} />
        <GridToolbarFilterButton sx={{ color: theme.palette.text.primary }} />
        <GridToolbarDensitySelector
          sx={{ color: theme.palette.text.primary }}
        />
        <GridToolbarExport sx={{ color: theme.palette.text.primary }} />
        {/* <Button
          startIcon={<Delete />}
          onClick={deleteVistor}
          size="small"
          sx={{ color: theme.palette.text.primary }}
        >
          Delete
        </Button> */}
      </GridToolbarContainer>
    );
  }

  if (pending || isLoadingPr) {
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
            معلومات المنتجات
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
            components={{ Toolbar: CustomToolbar }}
            rowsPerPageOptions={[6]}
            pageSize={6}
            getRowClassName={(params) => `rowsTable ${params.row}`}
            experimentalFeatures={{ newEditingApi: true }}
            isCellEditable={(params) => authorty(params)}
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

export default ProductControl;
