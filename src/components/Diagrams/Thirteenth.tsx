import { diagramDataFetcher } from "@/utils/api";
import { DiagramData, RawDiagramData } from "@/utils/types";
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

export type ThirteenthDiagram = {
  acceptance_rate_category: string;
  amount: number;
}[];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Thirteenth() {
  const { data, status } = useQuery<RawDiagramData<ThirteenthDiagram>>({
    queryFn: async () => await diagramDataFetcher<ThirteenthDiagram>(13),
    queryKey: ["thirteenthDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const processedData = data.allDiagrams[0].data;
  const sum = processedData
    .map(({ amount }) => amount)
    .reduce((prev, now) => prev + now);

  const diagramData = {
    labels: processedData.map(
      ({ acceptance_rate_category }) => acceptance_rate_category
    ),
    datasets: [
      {
        label: "Amount of Problems",
        data: processedData.map(({ amount }) => amount),
        backgroundColor: [colors[3], colors[2], colors[5], colors[0]],
        borderWidth: 0,
      },
      {
        label: "Percentage of Problems",
        data: processedData.map(({ amount }) => (amount / sum) * 100),
        backgroundColor: [colors[3], colors[2], colors[5], colors[0]],
        borderWidth: 2,
      },
    ],
  } as ChartData<"pie", number[], unknown>;

  return (
    <Pie
      data={diagramData}
      options={{
        plugins: {
          legend: {
            labels: {
              pointStyle: "circle",
              usePointStyle: true,
              color: "#ffffff",
            },
          },
        },
      }}
    ></Pie>
  );
}
