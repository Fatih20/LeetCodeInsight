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

export type Element13 = {
  tag_name: string;
  very_high_acceptance_problem_count: number;
  high_acceptance_problem_count: number;
  low_acceptance_problem_count: number;
  very_low_acceptance_problem_count: number;
  problem_count: number;
};

export type Diagram13 = {
  easiest: (Element13 & { easy_ratio: number })[];
  hardest: (Element13 & { hard_ratio: number })[];
};

export default function Diagram13() {
  const { data, status } = useQuery<RawDiagramData<Diagram13>>({
    queryFn: async () => await diagramDataFetcher<Diagram13>(13),
    queryKey: ["thirteenthDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const { easiest: dataEasiest, hardest: dataHardest } =
    data.allDiagrams[0].data;

  const diagramEasy = {
    labels: dataEasiest.map(({ tag_name }) => tag_name),
    datasets: [
      {
        label: "Very High Acceptance to Total Ratio",
        data: dataEasiest.map(({ easy_ratio }) => easy_ratio),
        colors: "#ffffff",
        backgroundColor: colors[7],
      },
      {
        label: "Number of Very High Acceptance Problems",
        data: dataEasiest.map(
          ({ very_high_acceptance_problem_count }) =>
            very_high_acceptance_problem_count
        ),
        colors: "#ffffff",
        backgroundColor: colors[3],
        hidden: true,
      },
      {
        label: "Number of High Acceptance Problems",
        data: dataEasiest.map(
          ({ high_acceptance_problem_count }) => high_acceptance_problem_count
        ),
        colors: "#ffffff",
        backgroundColor: colors[2],
        hidden: true,
      },
      {
        label: "Number of Low Acceptance Problems",
        data: dataEasiest.map(
          ({ low_acceptance_problem_count }) => low_acceptance_problem_count
        ),
        colors: "#ffffff",
        backgroundColor: colors[0],
        hidden: true,
      },
      {
        label: "Number of Very Low Acceptance Problems",
        data: dataEasiest.map(
          ({ very_low_acceptance_problem_count }) =>
            very_low_acceptance_problem_count
        ),
        colors: "#ffffff",
        backgroundColor: colors[0],
        hidden: true,
      },
      {
        label: "Number of Problems",
        data: dataEasiest.map(({ problem_count }) => problem_count),
        colors: "#ffffff",
        backgroundColor: colors[5],
        hidden: true,
      },
    ],
  };

  const diagramHard = {
    labels: dataHardest.map(({ tag_name }) => tag_name),
    datasets: [
      {
        label: "Very Low Acceptance to Total Ratio",
        data: dataHardest.map(({ hard_ratio }) => hard_ratio),
        colors: "#ffffff",
        backgroundColor: colors[7],
      },
      {
        label: "Number of Very High Acceptance Problems",
        data: dataHardest.map(
          ({ very_high_acceptance_problem_count }) =>
            very_high_acceptance_problem_count
        ),
        colors: "#ffffff",
        backgroundColor: colors[3],
        hidden: true,
      },
      {
        label: "Number of High Acceptance Problems",
        data: dataHardest.map(
          ({ high_acceptance_problem_count }) => high_acceptance_problem_count
        ),
        colors: "#ffffff",
        backgroundColor: colors[2],
        hidden: true,
      },
      {
        label: "Number of Low Acceptance Problems",
        data: dataHardest.map(
          ({ low_acceptance_problem_count }) => low_acceptance_problem_count
        ),
        colors: "#ffffff",
        backgroundColor: colors[0],
        hidden: true,
      },
      {
        label: "Number of Very Low Acceptance Problems",
        data: dataHardest.map(
          ({ very_low_acceptance_problem_count }) =>
            very_low_acceptance_problem_count
        ),
        colors: "#ffffff",
        backgroundColor: colors[0],
        hidden: true,
      },
      {
        label: "Number of Problems",
        data: dataHardest.map(({ problem_count }) => problem_count),
        colors: "#ffffff",
        backgroundColor: colors[5],
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
        data={diagramEasy}
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
        data={diagramHard}
      />
    </ChartWrapper>
  );
}
