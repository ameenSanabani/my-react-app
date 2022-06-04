import { Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const theme = useTheme();

  return (
    <>
      <motion.div
        style={{
          width: '70%',
          marginInline: 'auto',
          textAlign: 'center',
          color: theme.palette.primary.light,
        }}
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ stiffness: 32, type: 'spring' }}
      >
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Your DashBoard Informations
        </Typography>
      </motion.div>
    </>
  );
};

export default Dashboard;
