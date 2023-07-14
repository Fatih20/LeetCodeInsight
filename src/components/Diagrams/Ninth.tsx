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

export type NinthDiagram = { category: string; amount: number }[];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Ninth() {
  const { data, status } = useQuery<RawDiagramData<NinthDiagram>>({
    queryFn: async () => await diagramDataFetcher<NinthDiagram>(9),
    queryKey: ["ninthDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const processedData = data.allDiagrams[0].data;
  const sum = processedData
    .map(({ amount }) => amount)
    .reduce((prev, now) => prev + now);

  const diagramData = {
    labels: processedData.map(({ category }) => category),
    datasets: [
      {
        label: "Amount of Problems",
        data: processedData.map(({ amount }) => amount),
        backgroundColor: [
          colors[3],
          colors[0],
          colors[2],
          colors[4],
          colors[6],
          colors[5],
        ],
        borderWidth: 0,
      },
      {
        label: "Percentage of Problems",
        data: processedData.map(({ amount }) => (amount / sum) * 100),
        backgroundColor: [
          colors[3],
          colors[0],
          colors[2],
          colors[4],
          colors[6],
          colors[5],
        ],
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
