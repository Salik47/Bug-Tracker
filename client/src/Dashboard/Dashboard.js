import React, { useState, useEffect } from "react";
import {
	Chart as ChartJS,
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	Title,
} from "chart.js";
import PieChart from "./Graphs/PieChart";
import "./Dash.css";
import BarChart from "./Graphs/BarChart";
import Doughnut from "./Graphs/Doughnut";
import Menu from "../Menu/Menu";
ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

const Dashboard = () => {
	useEffect(() => {
		const fetchSamplings = async () => {
			const res = await fetch("https://api.coincap.io/v2/assets/?limit=5");
			const data = await res.json();

			setChartData({
				labels: data.data.map((crypto) => crypto.name),
				datasets: [
					{
						label: "Price in USD",
						data: data.data.map((crypto) => crypto.priceUsd),
						backgroundColor: [
							"#ffbb11",
							"#C0C0C0",
							"#50AF95",
							"#f3ba2f",
							"#2a71d0",
						],
					},
				],
			});
		};
		fetchSamplings();
	}, []);

	const [chartData, setChartData] = useState({
		datasets: [],
	});
	return (
		<>
			<Menu />
			<div className="content">
				<div className="row" style={{ paddingTop: "40px" }}>
					<div className="col-md-2"></div>
					<div className="col-md-4">
						<Doughnut chartData={chartData} />
					</div>

					<div className="col-md-4">
						<PieChart chartData={chartData} />
					</div>
					<div className="col-md-1"></div>
				</div>
				<div className="row" style={{ paddingTop: "40px" }}>
					<div className="col-md-4"></div>
					<div className="col-md-4">
						<BarChart chartData={chartData} />
					</div>
					<div className="col-md-4"></div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
