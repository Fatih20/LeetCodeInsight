import { diagramDataFetcher } from "@/utils/api";
import { DiagramData, RawDiagramData } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { colors } from "@/utils/colorPicker";
import PieChartWrapper from "./Peripheral/PieChartWrapper";

export type Diagram14 = {
  acceptance_rate_category: AcceptanceRateCategory;
  amount: number;
  difficulty: Difficulty;
}[];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Diagram14() {
  const { data, status } = useQuery<RawDiagramData<Diagram14>>({
    queryFn: async () => await diagramDataFetcher<Diagram14>(14),
    queryKey: ["thirteenthDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const processedData = data.allDiagrams[0].data;
  const easyData = processedData.filter(
    ({ difficulty }) => difficulty === "Easy"
  );
  const mediumData = processedData.filter(
    ({ difficulty }) => difficulty === "Medium"
  );
  const hardData = processedData.filter(
    ({ difficulty }) => difficulty === "Hard"
  );

  const easySum = easyData
    .map(({ amount }) => amount)
    .reduce((prev, current) => prev + current);

  const mediumSum = mediumData
    .map(({ amount }) => amount)
    .reduce((prev, current) => prev + current);

  const hardSum = hardData
    .map(({ amount }) => amount)
    .reduce((prev, current) => prev + current);

  const diagramDataEasy = {
    labels: easyData.map(
      ({ acceptance_rate_category }) => acceptance_rate_category
    ),
    datasets: [
      {
        label: "Amount of Problems (n)",
        data: easyData.map(({ amount }) => amount),
        backgroundColor: [colors[0], colors[5], colors[2], colors[3]],
        borderWidth: 0,
      },
      {
        label: "Percentage of Problems (%)",
        data: easyData.map(({ amount }) => (amount / easySum) * 100),
        backgroundColor: [colors[0], colors[5], colors[2], colors[3]],
        borderWidth: 2,
      },
    ],
  } as ChartData<"pie", number[], unknown>;

  const diagramDataMedium = {
    labels: mediumData.map(
      ({ acceptance_rate_category }) => acceptance_rate_category
    ),
    datasets: [
      {
        label: "Amount of Problems (n)",
        data: mediumData.map(({ amount }) => amount),
        backgroundColor: [colors[0], colors[5], colors[2], colors[3]],
        borderWidth: 0,
      },
      {
        label: "Percentage of Problems (%)",
        data: mediumData.map(({ amount }) => (amount / mediumSum) * 100),
        backgroundColor: [colors[0], colors[5], colors[2], colors[3]],
        borderWidth: 2,
      },
    ],
  } as ChartData<"pie", number[], unknown>;

  const diagramDataHard = {
    labels: hardData.map(
      ({ acceptance_rate_category }) => acceptance_rate_category
    ),
    datasets: [
      {
        label: "Amount of Problems (n)",
        data: hardData.map(({ amount }) => amount),
        backgroundColor: [colors[0], colors[5], colors[2], colors[3]],
        borderWidth: 0,
      },
      {
        label: "Percentage of Problems (%)",
        data: hardData.map(({ amount }) => (amount / hardSum) * 100),
        backgroundColor: [colors[0], colors[5], colors[2], colors[3]],
        borderWidth: 2,
      },
    ],
  } as ChartData<"pie", number[], unknown>;

  return (
    <PieChartWrapper>
      <Pie
        data={diagramDataEasy}
        options={{
          plugins: {
            legend: {
              title: {
                text: "Easy Problems",
                color: "#ffffff",
                display: true,
              },
              labels: {
                pointStyle: "circle",
                usePointStyle: true,
                color: "#ffffff",
              },
            },
          },
        }}
      ></Pie>
      <Pie
        data={diagramDataMedium}
        options={{
          plugins: {
            legend: {
              title: {
                text: "Medium Problems",
                color: "#ffffff",
                display: true,
              },
              labels: {
                pointStyle: "circle",
                usePointStyle: true,
                color: "#ffffff",
              },
            },
          },
        }}
      ></Pie>
      <Pie
        data={diagramDataHard}
        options={{
          plugins: {
            legend: {
              title: {
                text: "Hard Problems",
                color: "#ffffff",
                display: true,
              },
              labels: {
                pointStyle: "circle",
                usePointStyle: true,
                color: "#ffffff",
              },
            },
          },
        }}
      ></Pie>
    </PieChartWrapper>
  );
}
