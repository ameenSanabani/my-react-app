import axios from 'axios';

const USER_URI = '/users';

const registerUsers = async (data) => {
  const response = await axios.post(USER_URI, data);
  if (response.data) {
    localStorage.setItem('auth', JSON.stringify(response.data));
  }
  return response.data;
};

const authServies = {
  registerUsers,
};

export default authServies;
