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

export type Diagram8 = {
  difficulty: Difficulty;
  amount: number;
  is_premium: PremiumStatus;
}[];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Diagram8() {
  const { data, status } = useQuery<RawDiagramData<Diagram8>>({
    queryFn: async () => await diagramDataFetcher<Diagram8>(8),
    queryKey: ["eightDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const processedData = data.allDiagrams[0].data;
  console.log(processedData);
  const premiumData = processedData.filter(
    ({ is_premium }) => is_premium === "Premium"
  );
  const freeData = processedData.filter(
    ({ is_premium }) => is_premium === "Free"
  );
  const premiumSum = premiumData
    .map(({ amount }) => amount)
    .reduce((prev, current) => prev + current);
  const freeSum = freeData
    .map(({ amount }) => amount)
    .reduce((prev, current) => prev + current);

  const diagramDataFree = {
    labels: freeData.map(({ difficulty }) => difficulty),
    datasets: [
      {
        label: "Amount of Problems (n)",
        data: freeData.map(({ amount }) => amount),
        backgroundColor: [colors.lime, colors.red, colors.yellow],
        borderWidth: 0,
      },
      {
        label: "Percentage of Problems (%)",
        data: freeData.map(({ amount }) => (amount / freeSum) * 100),
        backgroundColor: [colors.lime, colors.red, colors.yellow],
        borderWidth: 2,
      },
    ],
  } as ChartData<"pie", number[], unknown>;

  const diagramDataPremium = {
    labels: premiumData.map(({ difficulty }) => difficulty),
    datasets: [
      {
        label: "Amount of Problems (n)",
        data: premiumData.map(({ amount }) => amount),
        backgroundColor: [colors.lime, colors.red, colors.yellow],
        borderWidth: 0,
      },
      {
        label: "Percentage of Problems (%)",
        data: premiumData.map(({ amount }) => (amount / premiumSum) * 100),
        backgroundColor: [colors.lime, colors.red, colors.yellow],
        borderWidth: 2,
      },
    ],
  } as ChartData<"pie", number[], unknown>;

  return (
    <ChartWrapper>
      <div className="flex w-full flex-col items-center justify-start gap-5">
        <Pie
          data={diagramDataFree}
          options={{
            plugins: {
              legend: {
                title: {
                  text: "Free Problems",
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
      </div>
    </ChartWrapper>
  );
}
