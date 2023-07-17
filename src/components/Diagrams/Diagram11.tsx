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

export type Element11 = {
  tag_name: string;
  easy_problem_count: number;
  medium_problem_count: number;
  hard_problem_count: number;
  problem_count: number;
};

export type Diagram11 = {
  easiest: (Element11 & { easy_ratio: number })[];
  hardest: (Element11 & { hard_ratio: number })[];
};

export default function Diagram11() {
  const { data, status } = useQuery<RawDiagramData<Diagram11>>({
    queryFn: async () => await diagramDataFetcher<Diagram11>(11),
    queryKey: ["eleventhDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const { easiest: dataEasiest, hardest: dataHardest } =
    data.allDiagrams[0].data;

  const diagramLike = {
    labels: dataEasiest.map(({ tag_name }) => tag_name),
    datasets: [
      {
        label: "Easy-Total Ratio",
        data: dataEasiest.map(({ easy_ratio }) => easy_ratio),
        colors: "#ffffff",
        backgroundColor: colors.bubblegum,
      },
      {
        label: "Number of Easy Problems",
        data: dataEasiest.map(({ easy_problem_count }) => easy_problem_count),
        colors: "#ffffff",
        backgroundColor: colors.lime,
        hidden: true,
      },
      {
        label: "Number of Medium Problems",
        data: dataEasiest.map(
          ({ medium_problem_count }) => medium_problem_count
        ),
        colors: "#ffffff",
        backgroundColor: colors.yellow,
        hidden: true,
      },
      {
        label: "Number of Hard Problems",
        data: dataEasiest.map(({ hard_problem_count }) => hard_problem_count),
        colors: "#ffffff",
        backgroundColor: colors.red,
        hidden: true,
      },
      {
        label: "Number of Problems",
        data: dataEasiest.map(({ problem_count }) => problem_count),
        colors: "#ffffff",
        backgroundColor: colors.blueberry,
        hidden: true,
      },
    ],
  };

  const diagramDislike = {
    labels: dataHardest.map(({ tag_name }) => tag_name),
    datasets: [
      {
        label: "Hard-Total Ratio",
        data: dataHardest.map(({ hard_ratio }) => hard_ratio),
        colors: "#ffffff",
        backgroundColor: colors.bubblegum,
      },
      {
        label: "Number of Easy Problems",
        data: dataHardest.map(({ easy_problem_count }) => easy_problem_count),
        colors: "#ffffff",
        backgroundColor: colors.lime,
        hidden: true,
      },
      {
        label: "Number of Medium Problems",
        data: dataHardest.map(
          ({ medium_problem_count }) => medium_problem_count
        ),
        colors: "#ffffff",
        backgroundColor: colors.yellow,
        hidden: true,
      },
      {
        label: "Number of Hard Problems",
        data: dataHardest.map(({ hard_problem_count }) => hard_problem_count),
        colors: "#ffffff",
        backgroundColor: colors.red,
        hidden: true,
      },
      {
        label: "Number of Problems",
        data: dataHardest.map(({ problem_count }) => problem_count),
        colors: "#ffffff",
        backgroundColor: colors.blueberry,
        hidden: true,
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
              text: "Easiest Tags",
            },
          },
        }}
        data={diagramLike}
      />
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
              text: "Hardest Tags",
            },
          },
        }}
        data={diagramDislike}
      />
    </ChartWrapper>
  );
}
