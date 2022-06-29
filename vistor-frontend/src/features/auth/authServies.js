import axios from 'axios';

const USER_URI = '/users';

const registerUsers = async (data) => {
  const response = await axios.post(USER_URI, data);
  if (response.data) {
    const data = {
      time: new Date().toLocaleString(),
      user: response.data,
    };

    localStorage.setItem('auth', JSON.stringify(data));
  }
  return response.data;
};

const loginUsers = async (data) => {
  const response = await axios.post(`${USER_URI}/login`, data);
  if (response.data) {
    const data = {
      time: new Date().toLocaleString(),
      user: response.data,
    };

    localStorage.setItem('auth', JSON.stringify(data));
  }
  return response.data;
};

const logoutUsers = () => {
  localStorage.removeItem('auth');
};

const infoUpdate = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${USER_URI}/update`, data, config);
  return response.data;
};

const passwordChange = async (passwordEdit, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${USER_URI}/update`, passwordEdit, config);

  return response.data;
};

const gMy = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(USER_URI, config);

  if (response.data) {
    const data = {
      time: new Date().toLocaleString(),
      user: response.data,
    };

    localStorage.setItem('auth', JSON.stringify(data));
  }
  return response.data;
};

const authServies = {
  registerUsers,
  loginUsers,
  logoutUsers,
  infoUpdate,
  passwordChange,
  gMy,
};

export default authServies;
