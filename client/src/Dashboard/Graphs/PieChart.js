import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const PieChart = ({ chartData }) => {
	return (
		<>
			<Chart type="pie" data={chartData} />
		</>
	);
};

export default PieChart;
