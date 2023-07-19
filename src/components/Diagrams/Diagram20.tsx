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

export type Diagram20 = {
  frequency_of_count: number;
  frequency_of_free_count_in_sector: number;
  frequency_of_premium_count_in_sector: number;
}[];

export default function Diagram20() {
  const { data, status } = useQuery<RawDiagramData<Diagram20>>({
    queryFn: async () => await diagramDataFetcher<Diagram20>(20),
    queryKey: ["twentiethDiagram"],
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
          ({ frequency_of_free_count_in_sector }) =>
            frequency_of_free_count_in_sector
        ),
        colors: "#ffffff",
        backgroundColor: colors.cocoa,
      },
      {
        label: "Frequency of Medium Problem Occuring n Times in a Sector",
        data: dataP.map(
          ({ frequency_of_premium_count_in_sector }) =>
            frequency_of_premium_count_in_sector
        ),
        colors: "#ffffff",
        backgroundColor: colors.yellow,
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
              text: "Frequency of Premium & Free Problem Occuring n Times in a Sector",
            },
          },
        }}
        data={diagram}
      />
    </ChartWrapper>
  );
}
