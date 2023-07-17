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
import ChartWrapper from "./Peripheral/ChartWrapper";

export type Diagram12 = {
  acceptance_rate_category: string;
  amount: number;
}[];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Diagram12() {
  const { data, status } = useQuery<RawDiagramData<Diagram12>>({
    queryFn: async () => await diagramDataFetcher<Diagram12>(12),
    queryKey: ["twelfthDiagram"],
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
        label: "Amount of Problems (n)",
        data: processedData.map(({ amount }) => amount),
        backgroundColor: [colors.lime, colors.yellow, colors.mint, colors.red],
        borderWidth: 0,
      },
      {
        label: "Percentage of Problems (%)",
        data: processedData.map(({ amount }) => (amount / sum) * 100),
        backgroundColor: [colors.lime, colors.yellow, colors.mint, colors.red],
        borderWidth: 2,
      },
    ],
  } as ChartData<"pie", number[], unknown>;

  return (
    <ChartWrapper>
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
    </ChartWrapper>
  );
}
