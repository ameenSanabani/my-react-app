import { Grid } from '@mui/material';
import * as React from 'react';

import LineChart from './LineChart';
import StepLineChart from './StepLineChart';
import BarChart from './BarChart';
import AreaChart from './AreaChart';

const Chart = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <BarChart isLoading={isLoading} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StepLineChart isLoading={isLoading} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LineChart isLoading={isLoading} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AreaChart isLoading={isLoading} />
      </Grid>
    </Grid>
  );
};

export default Chart;
