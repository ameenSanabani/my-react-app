import axios from 'axios';

const API_URL = '/api/product/';

const addProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, productData, config);

  return response.data;
};

const getProduct = async (productId) => {
  // const token = JSON.parse(localStorage.getItem('user'));
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token.token}`,
  //   },
  // };
  const response = await axios.get(API_URL + productId);

  return response.data;
};

const updProduct = async (productId, updatedInfo, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + productId, updatedInfo, config);

  return response.data;
};

const productServes = {
  addProduct,
  getProduct,
  updProduct,
};

export default productServes;
