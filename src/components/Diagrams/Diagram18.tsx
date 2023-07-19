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

export type Diagram18 = {
  sector_number: number;
  lower_limit: number;
  upper_limit: number;
  total_count: number;
  free_count: number;
  premium_count: number;
  premium_ratio: number;
  free_ratio: number;
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
export default function Diagram18() {
  const { data, status } = useQuery<RawDiagramData<Diagram18>>({
    queryFn: async () => await diagramDataFetcher<Diagram18>(18),
    queryKey: ["eighteenthDiagram"],
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
        label: "Number of Free Problems in Sector",
        data: dataP.map(({ free_count }) => free_count),
        colors: "#ffffff",
        backgroundColor: colors.cocoa,
        borderColor: colors.cocoa,
        tension: 0.5,
      },
      {
        label: "Number of Premium Problems in Sector",
        data: dataP.map(({ premium_count }) => premium_count),
        colors: "#ffffff",
        backgroundColor: colors.yellow,
        borderColor: colors.yellow,
        tension: 0.5,
        hidden: true,
      },
      {
        label: "Free-Total Ratio in Sector",
        data: dataP.map(({ free_ratio }) => free_ratio),
        colors: "#ffffff",
        backgroundColor: colors.cocoa2,
        borderColor: colors.cocoa2,
        tension: 0.5,
      },
      {
        label: "Premium-Total Ratio in Sector",
        data: dataP.map(({ premium_ratio }) => premium_ratio),
        colors: "#ffffff",
        backgroundColor: colors.yellow2,
        borderColor: colors.yellow2,
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
                  text: "Counting Frequencies of Premium Problems in Problem Sectors of Size 10",
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
