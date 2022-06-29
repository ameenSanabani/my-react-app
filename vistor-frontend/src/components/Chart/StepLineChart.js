import PropTypes from 'prop-types';
import * as React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material';

import EarningCard from './Skeleton/EarningCard';

const StepLineChart = ({ isLoading }) => {
  const theme = useTheme();

  //chart test

  const series = [
    {
      data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58],
    },
  ];
  const options = {
    chart: {
      type: 'line',
      height: 350,
    },
    stroke: {
      curve: 'stepline',
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: 'Stepline Chart',
      align: 'left',
      style: {
        color: theme.palette.text.primary,
      },
    },
    markers: {
      hover: {
        sizeOffset: 4,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: theme.palette.text.primary,
        },
      },
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          colors: theme.palette.text.primary,
        },
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <EarningCard />
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      )}
    </>
  );
};

StepLineChart.prototype = {
  isLoading: PropTypes.bool,
};

export default StepLineChart;
