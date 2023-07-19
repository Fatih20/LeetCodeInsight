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

export type Diagram19 = {
  frequency_of_count: number;
  frequency_of_easy_count_in_sector: number;
  frequency_of_medium_count_in_sector: number;
  frequency_of_hard_count_in_sector: number;
}[];

export default function Diagram19() {
  const { data, status } = useQuery<RawDiagramData<Diagram19>>({
    queryFn: async () => await diagramDataFetcher<Diagram19>(19),
    queryKey: ["ninteenthDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const dataP = data.allDiagrams[0].data;

  const diagram = {
    labels: dataP.map(({ frequency_of_count }) => frequency_of_count),
    datasets: [
      {
        label: "Frequency of Easy Problem Occuring n Times in a Sector",
        data: dataP.map(
          ({ frequency_of_easy_count_in_sector }) =>
            frequency_of_easy_count_in_sector
        ),
        colors: "#ffffff",
        backgroundColor: colors.lime,
      },
      {
        label: "Frequency of Medium Problem Occuring n Times in a Sector",
        data: dataP.map(
          ({ frequency_of_medium_count_in_sector }) =>
            frequency_of_medium_count_in_sector
        ),
        colors: "#ffffff",
        backgroundColor: colors.yellow,
      },
      {
        label: "Frequency of Hard Problem Occuring n Times in a Sector",
        data: dataP.map(
          ({ frequency_of_hard_count_in_sector }) =>
            frequency_of_hard_count_in_sector
        ),
        colors: "#ffffff",
        backgroundColor: colors.red,
      },
    ],
  };

  return (
    <ChartWrapper whatToShow={[false, true]}>
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
              text: "Frequency of Each Difficulty Occuring n Times in a Sector",
            },
          },
        }}
        data={diagram}
      />
    </ChartWrapper>
  );
}
