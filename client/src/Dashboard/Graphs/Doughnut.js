import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const Doughnut = ({ chartData }) => {
	return (
		<>
			<Chart type="doughnut" data={chartData} />
		</>
	);
};

export default Doughnut;
