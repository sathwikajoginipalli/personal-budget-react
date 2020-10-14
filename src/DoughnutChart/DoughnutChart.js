import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

function DoughnutChart(props) {
  const [data, setdata] = useState([]);
  var dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#fd6b19",
          "#8a89a6",
          "#a05d56",
          "#7b6888",
          "#d0743c",
          "#98abc5",
        ],
      },
    ],
    labels: [],
  };

  const { outerRadius = 150, innerRadius = 75 } = props;

  const margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateWarm)
    .domain([0, data.length]);

  // useEffect(() => {
  //   drawChart();
  // }, [data]);

  useEffect(() => {
    if(data.length == 0){
      axios.get("http://localhost:3001/budget").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          dataSource.datasets[0].data[i] = res.data[i].budget;
          dataSource.labels[i] = res.data[i].title;
        }
        var data = [
          { label: dataSource.labels[0], value: dataSource.datasets[0].data[0] },
          { label: dataSource.labels[1], value: dataSource.datasets[0].data[1] },
          { label: dataSource.labels[2], value: dataSource.datasets[0].data[2] },
          { label: dataSource.labels[3], value: dataSource.datasets[0].data[3] },
          { label: dataSource.labels[4], value: dataSource.datasets[0].data[4] },
          { label: dataSource.labels[5], value: dataSource.datasets[0].data[5] },
          { label: dataSource.labels[6], value: dataSource.datasets[0].data[6] },
          { label: dataSource.labels[7], value: dataSource.datasets[0].data[7] },
        ];
        setdata(data);
      });
    }
  
    if (data.length > 0) {
      drawChart();
    }
  });

  function drawChart() {
    console.log(data);
    // Remove the old svg
    d3.select("#pie-container").select("svg").remove();

    // Create new svg
    const svg = d3
      .select("#pie-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");
    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg.selectAll().data(pieGenerator(data)).enter();

    // Append arcs
    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (_, i) => colorScale(i))
      .style("stroke", "#ffffff")
      .style("stroke-width", 0);

    // Append text labels
    arc
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text((d) => d.data.label)
      .style("fill", (_, i) => colorScale(data.length - i))
      .attr("transform", (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }

  return <div id="pie-container" />;
}

export default DoughnutChart;
