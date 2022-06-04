import Dashbord from '../../pages/Dashboard';
import Login from '../../pages/Login';
import Registar from '../../pages/Registar';

const MainRout = {
  path: '/',
  element: <Dashbord />,
  children: [
    { path: '/login', element: <Login /> },
    { path: '/registar', element: <Registar /> },
  ],
};

export default MainRout;
