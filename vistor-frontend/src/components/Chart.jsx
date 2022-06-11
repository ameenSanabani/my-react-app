import { Grid } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

//chart test
const series = [
  {
    name: 'Desktops',
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
];

const options = {
  chart: {
    height: 350,
    type: 'line',
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
    text: 'تجربة معدل بيع',
    align: 'left',
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
};

const series1 = [
  {
    data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58],
  },
];
const options1 = {
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

const series2 = [
  {
    name: 'Inflation',
    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
  },
];

const options2 = {
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + '%';
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#304758'],
    },
  },

  xaxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    position: 'top',
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val) {
        return val + '%';
      },
    },
  },
  title: {
    text: 'Monthly Inflation in Argentina, 2002',
    floating: true,
    offsetY: 330,
    align: 'center',
    style: {
      color: '#444',
    },
  },
};

const series3 = [
  {
    name: 'STOCK ABC',
    data: [9600, 9300, 9000, 8700, 8400, 8100, 7800],
  },
];

const options3 = {
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

const Chart = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ReactApexChart
          options={options2}
          series={series2}
          type="bar"
          height={350}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ReactApexChart
          options={options1}
          series={series1}
          type="line"
          height={350}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ReactApexChart
          options={options3}
          series={series3}
          type="area"
          height={350}
        />
      </Grid>
    </Grid>
  );
};

export default Chart;
