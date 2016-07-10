import { PieChart } from 'rd3';
import React from 'react';

const makeChartData = (wordCounts) => {
  const chartData = [];
  let total = 0;
  wordCounts.forEach((wordObject) => {
    const label = wordObject.word;
    const value = wordObject.percentage.toFixed(0);
    total += value;
    chartData.push({
      label,
      value,
    });
  });
  return chartData;
  // return pieData;
};

export const Pie = ({ wordCounts }) => (
  <PieChart
    data={makeChartData(wordCounts)}
    width={350}
    height={300}
    radius={90}
    innerRadius={20}
    showInnerLabels={false}
    sectorBorderColor="white"
  />
);

Pie.propTypes = {
  wordCounts: React.PropTypes.array,
};
