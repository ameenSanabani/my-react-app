import PropTypes from 'prop-types';
import * as React from 'react';
import ReactApexChart from 'react-apexcharts';

import EarningCard from './Skeleton/EarningCard';

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
  },
  markers: {
    hover: {
      sizeOffset: 4,
    },
  },
};

const StepLineChart = ({ isLoading }) => {
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
