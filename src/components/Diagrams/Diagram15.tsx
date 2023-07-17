import { diagramDataFetcher } from "@/utils/api";
import { DiagramData, RawDiagramData } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { colors } from "@/utils/colorPicker";
import ChartWrapper from "./Peripheral/ChartWrapper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type Diagram15 = {
  solution_type: SolutionType;
  average_ratio: Number;
  max_ratio: Number;
  min_ratio: Number;
}[];

export default function Diagram15() {
  const { data, status } = useQuery<RawDiagramData<Diagram15>>({
    queryFn: async () => await diagramDataFetcher<Diagram15>(15),
    queryKey: ["fifteenthDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const dataP = data.allDiagrams[0].data;

  const diagramLike = {
    labels: dataP.map(({ solution_type }) => solution_type),
    datasets: [
      {
        label: "Average",
        data: dataP.map(({ average_ratio }) => average_ratio),
        colors: "#ffffff",
        backgroundColor: colors.yellow,
      },
      {
        label: "Max",
        data: dataP.map(({ max_ratio }) => max_ratio),
        colors: "#ffffff",
        backgroundColor: colors.lime,
      },
      {
        label: "Min",
        data: dataP.map(({ min_ratio }) => min_ratio),
        colors: "#ffffff",
        backgroundColor: colors.red,
      },
    ],
  };

  return (
    <ChartWrapper>
      <Bar
        options={{
          scales: {
            x: {
              border: {
                color: "#fff",
              },
              ticks: {
                color: "#fff",
              },
              grid: {},
            },
            y: {
              border: {
                color: "#fff",
              },
              ticks: {
                color: "#fff",
              },
              grid: {},
            },
          },
          indexAxis: "y" as const,
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {},
            legend: {
              position: "top" as const,
              labels: {
                color: "#fff",
                pointStyle: "circle",
                usePointStyle: true,
              },
            },
            title: {
              color: "#ffffff",
              display: true,
              text: "Solution Type and Solution/Submission Ratio",
            },
          },
        }}
        data={diagramLike}
      />
    </ChartWrapper>
  );
}
