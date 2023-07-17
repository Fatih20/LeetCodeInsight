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

export type Element5 = {
  tag_name: string;
  total_likes: number;
  total_dislike: number;
  ratio: number;
};

export type Diagram5 = {
  likes: Element5[];
  dislikes: Element5[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Diagram5() {
  const { data, status } = useQuery<RawDiagramData<Diagram5>>({
    queryFn: async () => await diagramDataFetcher<Diagram5>(5),
    queryKey: ["fiveDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const { dislikes: dataDislikes, likes: dataLikes } = data.allDiagrams[0].data;

  const diagramLike = {
    labels: dataLikes.map(({ tag_name }) => tag_name),
    datasets: [
      {
        label: "Like-Dislike Ratio",
        data: dataLikes.map(({ ratio }) => ratio),
        colors: "#ffffff",
        backgroundColor: colors[2],
      },
      {
        label: "Likes",
        data: dataLikes.map(({ total_likes }) => total_likes),
        colors: "#ffffff",
        backgroundColor: colors[3],
        hidden: true,
      },
      {
        label: "Dislikes",
        data: dataLikes.map(({ total_dislike }) => total_dislike),
        colors: "#ffffff",
        backgroundColor: colors[0],
        hidden: true,
      },
    ],
  };

  const diagramDislike = {
    labels: dataDislikes.map(({ tag_name }) => tag_name),
    datasets: [
      {
        label: "Like-Dislike Ratio",
        data: dataDislikes.map(({ ratio }) => ratio),
        colors: "#ffffff",
        backgroundColor: colors[2],
      },
      {
        label: "Likes",
        data: dataDislikes.map(({ total_likes }) => total_likes),
        colors: "#ffffff",
        backgroundColor: colors[3],
        hidden: true,
      },
      {
        label: "Dislikes",
        data: dataDislikes.map(({ total_dislike }) => total_dislike),
        colors: "#ffffff",
        backgroundColor: colors[0],
        hidden: true,
      },
    ],
  };

  return (
    <div className="w-full h-full">
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
              position: "right" as const,
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
              position: "right" as const,
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
    </div>
  );
}
