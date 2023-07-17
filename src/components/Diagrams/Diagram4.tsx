import { diagramDataFetcher } from "@/utils/api";
import { DiagramData, RawDiagramData } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { colors } from "@/utils/colorPicker";
import ChartWrapper from "./Peripheral/ChartWrapper";

export type Diagram4 = {
  number: number;
  log_number_of_submission: number;
}[];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Diagram4() {
  const { data, status } = useQuery<RawDiagramData<Diagram4>>({
    queryFn: async () => await diagramDataFetcher<Diagram4>(4),
    queryKey: ["fourthDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const dataP = data.allDiagrams[0].data;

  const labels = dataP.map(({ number }) => number);

  const dataDiagram = {
    labels,
    datasets: [
      {
        label: "log(number of submissions)",
        data: dataP.map(
          ({ log_number_of_submission }) => log_number_of_submission
        ),
        colors: "#ffffff",
        backgroundColor: colors[3],
      },
    ],
  };

  return (
    <ChartWrapper whatToShow={[false, false]}>
      <Line
        options={{
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y" as const,
          scales: {
            x: {
              border: {
                color: "#fff",
              },
              ticks: {
                color: "#fff",
              },
              grid: {
                color: "#ffffff53",
              },
            },
            y: {
              border: {
                color: "#fff",
              },
              ticks: {
                color: "#fff",
              },
              grid: {
                color: "#ffffff53",
              },
            },
          },
          plugins: {
            legend: {
              position: "top" as const,
              labels: {
                color: "#fff",
                pointStyle: "circle",
                usePointStyle: true,
              },
              title: {
                text: "Problem number and log(number of submissions)",
                color: "#fff",
                position: "center",
                display: true,
              },
            },
          },
        }}
        data={dataDiagram}
      />
    </ChartWrapper>
  );
}
