const changeMode = (data) => {
  localStorage.setItem('mode', data ? 'ON' : 'OFF');
};

export default changeMode;
