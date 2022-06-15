import { Grid, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Error = () => {
  const theme = useTheme();

  return (
    <Grid textAlign="center" width="100%" mt={5}>
      <Typography variant="h1">هذه الصفحة غير متوفرة</Typography>
      <Link to="/login">
        <Typography variant="h3" mt={5} color={theme.palette.text.primary}>
          للعودة اضغط هنا
        </Typography>
      </Link>
    </Grid>
  );
};

export default Error;
