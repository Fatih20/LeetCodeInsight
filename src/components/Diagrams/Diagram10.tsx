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

export type Element10 = {
  tag_name: string;
  problem_count: number;
  ratio: number;
};

export type Diagram10 = {
  likes: (Element10 & { liked_problem_count: number })[];
  dislikes: (Element10 & { disliked_problem_count: number })[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Diagram10() {
  const { data, status } = useQuery<RawDiagramData<Diagram10>>({
    queryFn: async () => await diagramDataFetcher<Diagram10>(10),
    queryKey: ["tenthDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const { dislikes: dataDislikes, likes: dataLikes } = data.allDiagrams[0].data;

  const diagramLike = {
    labels: dataLikes.map(({ tag_name }) => tag_name),
    datasets: [
      {
        label: "Ratio",
        data: dataLikes.map(({ ratio }) => ratio),
        colors: "#ffffff",
        backgroundColor: colors[2],
      },
      {
        label: "Number of Liked Problems",
        data: dataLikes.map(({ liked_problem_count }) => liked_problem_count),
        colors: "#ffffff",
        backgroundColor: colors[3],
        hidden: true,
      },
      {
        label: "Number of Problems",
        data: dataLikes.map(({ problem_count }) => problem_count),
        colors: "#ffffff",
        backgroundColor: colors[5],
        hidden: true,
      },
    ],
  };

  const diagramDislike = {
    labels: dataDislikes.map(({ tag_name }) => tag_name),
    datasets: [
      {
        label: "Ratio",
        data: dataDislikes.map(({ ratio }) => ratio),
        colors: "#ffffff",
        backgroundColor: colors[2],
      },
      {
        label: "Number of Disliked Problems",
        data: dataDislikes.map(
          ({ disliked_problem_count }) => disliked_problem_count
        ),
        colors: "#ffffff",
        backgroundColor: colors[0],
        hidden: true,
      },
      {
        label: "Number of Problems",
        data: dataDislikes.map(({ problem_count }) => problem_count),
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
              text: "Most Liked Tags",
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
              text: "Most Disliked Tags",
            },
          },
        }}
        data={diagramDislike}
      />
    </ChartWrapper>
  );
}
