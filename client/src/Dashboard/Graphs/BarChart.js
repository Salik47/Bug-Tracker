import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
	return (
		<>
			<Chart type="bar" data={chartData} />
		</>
	);
};

export default BarChart;
