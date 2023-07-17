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

export type Diagram2 = { solution_type: string; amount: number }[];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Diagram2() {
  const { data, status } = useQuery<RawDiagramData<Diagram2>>({
    queryFn: async () => await diagramDataFetcher<Diagram2>(2),
    queryKey: ["secondDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const processedData = data.allDiagrams[0].data;
  const sum = processedData
    .map(({ amount }) => amount)
    .reduce((prev, now) => prev + now);

  const diagramData = {
    labels: processedData.map(({ solution_type }) => solution_type),
    datasets: [
      {
        label: "Amount of Problems (n)",
        data: processedData.map(({ amount }) => amount),
        backgroundColor: [colors.slate, colors.blueberry, colors.bubblegum],
        borderWidth: 0,
      },
      {
        label: "Percentage of Problems (%)",
        data: processedData.map(({ amount }) => (amount / sum) * 100),
        backgroundColor: [colors.slate, colors.blueberry, colors.bubblegum],
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
