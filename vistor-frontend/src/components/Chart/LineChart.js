import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

import PopularCard from './Skeleton/PopularCard';

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

const LineChart = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <PopularCard />
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

LineChart.prototype = {
  isLoading: PropTypes.bool,
};

export default LineChart;
