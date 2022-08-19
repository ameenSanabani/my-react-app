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

import { reset, productAdd } from '../features/products/productSlicer';
import Spinner from '../components/Spinner';
import SpinnerDark from '../components/SpinnerDark';

const Product = () => {
  const [productNew, setProductNew] = useState({
    product: '',
    display: true,
    category: '',
    brand: '',
    model: '',
    units: '',
    specialCode: '',
    barcode: '',
    explanation: '',
    content: '',
    documents: '',
  });
  const [options, setOptions] = useState([]);

  // eslint-disable-next-line

  const {
    product,
    display,
    category,
    brand,
    model,
    units,
    specialCode,
    barcode,
    explanation,
    content,
    documents,
  } = productNew;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { products, isErrorPr, isSuccessPr, isLoadingPr, messagePr } =
    useSelector((state) => state.products);
  const { modeDark } = useSelector((state) => state.mode);

  const theme = useTheme();

  const { user } = auth;

  const onChange = (e) => {
    setProductNew((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (isSuccessPr && products) {
      dispatch(reset());
      setProductNew({
        product: '',
        display: true,
        category: '',
        brand: '',
        model: '',
        units: '',
        specialCode: '',
        barcode: '',
        explanation: '',
        content: '',
        documents: '',
      });
    }

    const getOption = async () => {
      const response = await axios('/api/product');
      setOptions(response.data);
    };

    getOption();
    dispatch(reset());
  }, [products, isErrorPr, isSuccessPr, messagePr, dispatch, user, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const productInfo = {
      product,
      display,
      category,
      brand,
      model,
      units,
      specialCode,
      barcode,
      explanation,
      content,
      documents,
    };

    if (product && category && units) {
      dispatch(productAdd(productInfo));
    } else {
      console.log('complate product info');
    }
  };

  const arr = options?.map((opt) => opt.category);
  const categoryArr = [...new Set(arr)];
  const arrBrand = options?.map((opt) => opt.brand);
  const unicBrand = [...new Set(arrBrand)];
  const arrModel = options?.map((opt) => opt.model);
  const unicModel = [...new Set(arrModel)];
  const arrUnits = options?.map((opt) => opt.units);
  const unicUnits = [...new Set(arrUnits)];

  if (isLoadingPr) {
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
          اضافة منتج
        </Typography>
      </motion.div>
      <form onSubmit={onSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: { xs: 300, sm: 700 },
            margin: '10px auto',
          }}
          bgcolor={theme.palette.background.default}
        >
          <Grid item xs={12}>
            <TextField
              sx={{ width: '100%' }}
              type="text"
              name="product"
              variant="filled"
              size="small"
              label="اكتب اسم المنتج"
              onChange={onChange}
              value={product}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              disablePortal
              value={category}
              onChange={onChange}
              freeSolo
              autoSelect
              options={categoryArr}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: '100%' }}
                  name="category"
                  size="small"
                  variant="filled"
                  label="اختار اواضف فئه المنتج"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              disablePortal
              value={brand}
              onChange={onChange}
              freeSolo
              autoSelect
              options={unicBrand}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: '100%' }}
                  name="brand"
                  size="small"
                  variant="filled"
                  label="اختار اواضف علامة المنتج"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              disablePortal
              value={model}
              onChange={onChange}
              freeSolo
              autoSelect
              options={unicModel}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: '100%' }}
                  name="model"
                  size="small"
                  variant="filled"
                  label="اختار اواضف موديل المنتج"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              disablePortal
              value={units}
              onChange={onChange}
              freeSolo
              autoSelect
              options={unicUnits}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: '100%' }}
                  name="units"
                  size="small"
                  variant="filled"
                  label="اختار اواضف وحدة قياس المنتج"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '100%' }}
              type="text"
              name="specialCode"
              size="small"
              variant="filled"
              label="اكتب كود خاص بالمنتج"
              onChange={onChange}
              value={specialCode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '100%' }}
              type="text"
              name="barcode"
              size="small"
              variant="filled"
              label="barcode"
              onChange={onChange}
              value={barcode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ width: '100%' }}
              type="text"
              name="explanation"
              size="small"
              variant="filled"
              label="اكتب شرح عن المنتج"
              onChange={onChange}
              value={explanation}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '100%' }}
              type="text"
              name="content"
              size="small"
              variant="filled"
              label="اكتب معلومات المورد الخاص بالمنتج"
              onChange={onChange}
              value={content}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '100%' }}
              type="text"
              name="documents"
              size="small"
              variant="filled"
              label="اكتب معلومات الوثائق الخاصه بالمنتج"
              onChange={onChange}
              value={documents}
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

export default Product;
