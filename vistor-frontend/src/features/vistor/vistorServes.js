import axios from 'axios';

const API_URL = '/api/vistors/';

const addVistor = async (vistorData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, vistorData, config);

  return response.data;
};

const vistorGet = async () => {
  // const token = JSON.parse(localStorage.getItem('user'));
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token.token}`,
  //   },
  // };
  const response = await axios.get(API_URL);

  return response.data;
};

const vistorDel = async (praper, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + praper, config);

  return response.data;
};

const updVistor = async (vistorId, updatedInfo) => {
  const token = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };
  const response = await axios.put(API_URL + vistorId, updatedInfo, config);

  return response.data;
};

const vistorServes = {
  addVistor,
  vistorGet,
  vistorDel,
  updVistor,
};

export default vistorServes;
