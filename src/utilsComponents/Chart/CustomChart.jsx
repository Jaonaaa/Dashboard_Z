import React from "react";
import {
  LinearScale,
  CategoryScale,
  LineElement,
  Chart,
  PointElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut, Line, Pie, PolarArea } from "react-chartjs-2";
import "./style/CustomChart.sass";
Chart.register(LinearScale, CategoryScale, LineElement, PointElement, BarElement, ArcElement, RadialLinearScale, Tooltip, Legend);

export const example = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Sales Data",
      backgroundColor: ["rgba(75, 192, 192, 0.2)", "#f49090a1", "#2e99a099", "#018a00d9", "#e97123a1"],
      borderColor: ["rgba(75, 192, 192, 0.2)", "#f49090a1", "#2e99a099", "#018a00d9", "#e97123a1"],
      borderWidth: 1,
      data: [60, 26, 60, 55, 20],
    },
  ],
};

/**
 *@typedef {Object} ChartArgument
 *@property {String[]} labels
 *@property {[]} datasets
 *@property {String} title
 *@property {"default"|"bottom"|"top"} positionTitle
 *@property {"line"|"doughnut"|"bar"|"pie"|"polarArea"} type
 *@property {{}} options
 */

/**
 *
 * @param {ChartArgument} props
 * @returns
 */
const CustomChart = (props) => {
  const { labels, datasets, title, type, positionTitle, options } = props;
  const chartData = {
    labels: labels,
    datasets: datasets,
    options: options,
  };

  return (
    <div className={`chart_container ${positionTitle === "bottom" ? "upper_chart" : ""}`}>
      {positionTitle === undefined || positionTitle === "default" ? <div className="title">{title}</div> : ""}
      {positionTitle === "top" && <div className="title top_title_chart">{title}</div>}
      {type === "line" && <Line data={chartData} />}
      {type === "doughnut" && <Doughnut data={chartData} />}
      {type === "bar" && <Bar data={chartData} />}
      {type === "pie" && <Pie data={chartData} />}
      {type === "polarArea" && <PolarArea data={chartData} />}
      {positionTitle === "bottom" && <div className="title bottom_title_chart">{title}</div>}
    </div>
  );
};

export default CustomChart;
