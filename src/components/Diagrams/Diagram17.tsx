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
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { colors } from "@/utils/colorPicker";
import ChartWrapper from "./Peripheral/ChartWrapper";

export type Diagram17 = {
  sector_number: number;
  lower_limit: number;
  upper_limit: number;
  total_count: number;
  easy_count: number;
  medium_count: number;
  hard_count: number;
  easy_ratio: number;
  medium_ratio: number;
  hard_ratio: number;
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
export default function Diagram17() {
  const { data, status } = useQuery<RawDiagramData<Diagram17>>({
    queryFn: async () => await diagramDataFetcher<Diagram17>(17),
    queryKey: ["seventeenthDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const dataP = data.allDiagrams[0].data;

  const labels = dataP.map(
    ({ lower_limit, upper_limit }) => `${lower_limit}-${upper_limit}`
  );

  const dataDiagram = {
    labels,
    datasets: [
      {
        label: "Number of Problems in Sector",
        data: dataP.map(({ total_count }) => total_count),
        colors: "#ffffff",
        backgroundColor: colors.blueberry,
        borderColor: colors.blueberry,
        tension: 0.5,
        hidden: true,
      },
      {
        label: "Number of Easy Problems in Sector",
        data: dataP.map(({ easy_count }) => easy_count),
        colors: "#ffffff",
        backgroundColor: colors.lime,
        borderColor: colors.lime,
        tension: 0.5,
      },
      {
        label: "Number of Medium Problems in Sector",
        data: dataP.map(({ medium_count }) => medium_count),
        colors: "#ffffff",
        backgroundColor: colors.yellow,
        borderColor: colors.yellow,
        tension: 0.5,
        hidden: true,
      },
      {
        label: "Number of Hard Problems in Sector",
        data: dataP.map(({ hard_count }) => hard_count),
        colors: "#ffffff",
        backgroundColor: colors.red,
        borderColor: colors.red,
        tension: 0.5,
        hidden: true,
      },
      {
        label: "Easy-Total Ratio in Sector",
        data: dataP.map(({ easy_ratio }) => easy_ratio),
        colors: "#ffffff",
        backgroundColor: colors.lime2,
        borderColor: colors.lime2,
        tension: 0.5,
      },
      {
        label: "Medium-Total Ratio in Sector",
        data: dataP.map(({ medium_ratio }) => medium_ratio),
        colors: "#ffffff",
        backgroundColor: colors.yellow2,
        borderColor: colors.yellow2,
        tension: 0.5,
        hidden: true,
      },
      {
        label: "Hard-Total Ratio in Sector",
        data: dataP.map(({ hard_ratio }) => hard_ratio),
        colors: "#ffffff",
        backgroundColor: colors.red2,
        borderColor: colors.red2,
        tension: 0.5,
        hidden: true,
      },
    ],
  };

  return (
    <ChartWrapper whatToShow={[false, true]} fullWidth={true}>
      <div className="h-[2160px] min-h-[2160px] w-full flex flex-col items-center justify-start">
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
            elements: {
              point: {
                radius: 3,
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
                  text: "Counting Frequencies of Difficulties in Problem Sectors of Size 10",
                  color: "#fff",
                  position: "center",
                  display: true,
                },
              },
            },
          }}
          data={dataDiagram}
        />
      </div>
    </ChartWrapper>
  );
}
