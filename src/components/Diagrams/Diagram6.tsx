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

export type Diagram6 = {
  solution_type: SolutionType;
  is_premium: PremiumStatus;
  normalized_amount: number;
}[];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Diagram6() {
  const { data, status } = useQuery<RawDiagramData<Diagram6>>({
    queryFn: async () => await diagramDataFetcher<Diagram6>(6),
    queryKey: ["sixthDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const processedData = data.allDiagrams[0].data;
  const premiumData = processedData.filter(
    ({ is_premium }) => is_premium === "Premium"
  );
  const freeData = processedData.filter(
    ({ is_premium }) => is_premium === "Free"
  );

  const diagramDataPremium = {
    labels: premiumData.map(({ solution_type }) => solution_type),
    datasets: [
      {
        label: "Percentage of Problems (%)",
        data: premiumData.map(
          ({ normalized_amount }) => normalized_amount * 100
        ),
        backgroundColor: [colors[0], colors[2], colors[3]],
        borderWidth: 0,
      },
    ],
  } as ChartData<"pie", number[], unknown>;

  const diagramDataFree = {
    labels: freeData.map(({ solution_type }) => solution_type),
    datasets: [
      {
        label: "Percentage of Problems (%)",
        data: freeData.map(({ normalized_amount }) => normalized_amount * 100),
        backgroundColor: [colors[0], colors[2], colors[3]],
        borderWidth: 0,
      },
    ],
  } as ChartData<"pie", number[], unknown>;

  return (
    <PieChartWrapper>
      <div className="flex w-full flex-col items-center justify-start gap-5">
        <Pie
          data={diagramDataPremium}
          options={{
            plugins: {
              legend: {
                title: {
                  text: "Premium Problems",
                  color: "#ffffff",
                  display: true,
                },
                labels: {
                  pointStyle: "circle",
                  usePointStyle: true,
                  color: "#ffffff",
                },
              },
            },
          }}
        ></Pie>
        <Pie
          data={diagramDataFree}
          options={{
            plugins: {
              legend: {
                title: {
                  text: "Premium Problems",
                  color: "#ffffff",
                  display: true,
                },
                labels: {
                  pointStyle: "circle",
                  usePointStyle: true,
                  color: "#ffffff",
                },
              },
            },
          }}
        ></Pie>
      </div>
    </PieChartWrapper>
  );
}
