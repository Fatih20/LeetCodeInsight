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

export type Diagram3 = {
  solution_type: SolutionType;
  difficulty: Difficulty;
  amount: number;
}[];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Diagram3() {
  const { data, status } = useQuery<RawDiagramData<Diagram3>>({
    queryFn: async () => await diagramDataFetcher<Diagram3>(3),
    queryKey: ["thirdDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const processedData = data.allDiagrams[0].data;
  const easyData = processedData.filter(
    ({ difficulty }) => difficulty === "Easy"
  );
  const mediumData = processedData.filter(
    ({ difficulty }) => difficulty === "Medium"
  );
  const hardData = processedData.filter(
    ({ difficulty }) => difficulty === "Hard"
  );

  const easySum = easyData
    .map(({ amount }) => amount)
    .reduce((prev, current) => prev + current);

  const mediumSum = mediumData
    .map(({ amount }) => amount)
    .reduce((prev, current) => prev + current);

  const hardSum = hardData
    .map(({ amount }) => amount)
    .reduce((prev, current) => prev + current);

  const diagramDataEasy = {
    labels: easyData.map(({ solution_type }) => solution_type),
    datasets: [
      {
        label: "Percentage of Problems (%)",
        data: easyData.map(({ amount }) => (amount / easySum) * 100),
        backgroundColor: [colors.slate, colors.blueberry, colors.bubblegum],
        borderWidth: 0,
      },
    ],
  } as ChartData<"pie", number[], unknown>;

  const diagramDataMedium = {
    labels: mediumData.map(({ solution_type }) => solution_type),
    datasets: [
      {
        label: "Percentage of Problems (%)",
        data: mediumData.map(({ amount }) => (amount / mediumSum) * 100),
        backgroundColor: [colors.slate, colors.blueberry, colors.bubblegum],
        borderWidth: 0,
      },
    ],
  } as ChartData<"pie", number[], unknown>;

  const diagramDataHard = {
    labels: hardData.map(({ solution_type }) => solution_type),
    datasets: [
      {
        label: "Percentage of Problems (%)",
        data: hardData.map(({ amount }) => (amount / hardSum) * 100),
        backgroundColor: [colors.slate, colors.blueberry, colors.bubblegum],
        borderWidth: 0,
      },
    ],
  } as ChartData<"pie", number[], unknown>;

  return (
    <ChartWrapper whatToShow={[false, true]}>
      <div className="flex w-full flex-col items-center justify-start gap-5">
        <Pie
          data={diagramDataEasy}
          options={{
            plugins: {
              legend: {
                title: {
                  text: "Easy Problems",
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
          data={diagramDataMedium}
          options={{
            plugins: {
              legend: {
                title: {
                  text: "Medium Problems",
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
          data={diagramDataHard}
          options={{
            plugins: {
              legend: {
                title: {
                  text: "Hard Problems",
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
