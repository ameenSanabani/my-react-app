import PropTypes from 'prop-types';
import * as React from 'react';
import ReactApexChart from 'react-apexcharts';

import EarningCard from './Skeleton/EarningCard';

//chart test
const series = [
  {
    name: 'STOCK ABC',
    data: [9600, 9300, 9000, 8700, 8400, 8100, 7800],
  },
];

const options = {
  chart: {
    type: 'area',
    height: 350,
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },

  title: {
    text: 'Fundamental Analysis of Stocks',
    align: 'left',
  },
  subtitle: {
    text: 'Price Movements',
    align: 'left',
  },
  labels: [
    '15 Nov',
    '17 Nov',
    '19 Nov',
    '21 Nov',
    '23 Nov',
    '25 Nov',
    '29 Nov',
    '04 Dec',
    '06 Dec',
    '08 Dec',
  ],
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    opposite: true,
  },
  legend: {
    horizontalAlign: 'left',
  },
};

const AreaChart = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <EarningCard />
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      )}
    </>
  );
};

AreaChart.prototype = {
  isLoading: PropTypes.bool,
};

export default AreaChart;
