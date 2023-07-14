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

export type Diagram7 = { type: string; amount: number }[];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Diagram7() {
  const { data, status } = useQuery<RawDiagramData<Diagram7>>({
    queryFn: async () => await diagramDataFetcher<Diagram7>(7),
    queryKey: ["seventhDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const processedData = data.allDiagrams[0].data;
  const sum = processedData
    .map(({ amount }) => amount)
    .reduce((prev, now) => prev + now);

  const diagramData = {
    labels: processedData.map(({ type }) => type),
    datasets: [
      {
        label: "Amount of Problems (n)",
        data: processedData.map(({ amount }) => amount),
        backgroundColor: [colors[3], colors[0], colors[2]],
        borderWidth: 0,
      },
      {
        label: "Percentage of Problems (%)",
        data: processedData.map(({ amount }) => (amount / sum) * 100),
        backgroundColor: [colors[3], colors[0], colors[2]],
        borderWidth: 2,
      },
    ],
  } as ChartData<"pie", number[], unknown>;

  return (
    <PieChartWrapper>
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
    </PieChartWrapper>
  );
}
