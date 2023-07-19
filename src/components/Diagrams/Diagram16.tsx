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

export type Element16 = {
  tag_name: string;
  premium_count: number;
  free_count: number;
  total_count: number;
  premium_free_ratio: number;
};

export type Diagram16 = {
  premiumest: Element16[];
  freest: Element16[];
};

export default function Diagram16() {
  const { data, status } = useQuery<RawDiagramData<Diagram16>>({
    queryFn: async () => await diagramDataFetcher<Diagram16>(16),
    queryKey: ["sixteenthDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  const { premiumest: dataPremium, freest: dataFree } =
    data.allDiagrams[0].data;

  const diagramFree = {
    labels: dataFree.map(({ tag_name }) => tag_name),
    datasets: [
      {
        label: "Premium-Free Ratio",
        data: dataFree.map(({ premium_free_ratio }) => premium_free_ratio),
        colors: "#ffffff",
        backgroundColor: colors.bubblegum,
      },
      {
        label: "Number of Easy Problems",
        data: dataFree.map(({ free_count }) => free_count),
        colors: "#ffffff",
        backgroundColor: colors.black,
        hidden: true,
      },
      {
        label: "Number of Premium Problems",
        data: dataFree.map(({ premium_count }) => premium_count),
        colors: "#ffffff",
        backgroundColor: colors.yellow,
      },
      {
        label: "Number of Problems",
        data: dataFree.map(({ total_count }) => total_count),
        colors: "#ffffff",
        backgroundColor: colors.blueberry,
        hidden: true,
      },
    ],
  };

  const diagramPremium = {
    labels: dataPremium.map(({ tag_name }) => tag_name),
    datasets: [
      {
        label: "Premium-Free Ratio",
        data: dataPremium.map(({ premium_free_ratio }) => premium_free_ratio),
        colors: "#ffffff",
        backgroundColor: colors.bubblegum,
      },
      {
        label: "Number of Easy Problems",
        data: dataPremium.map(({ free_count }) => free_count),
        colors: "#ffffff",
        backgroundColor: colors.black,
        hidden: true,
      },
      {
        label: "Number of Premium Problems",
        data: dataPremium.map(({ premium_count }) => premium_count),
        colors: "#ffffff",
        backgroundColor: colors.yellow,
        hidden: true,
      },
      {
        label: "Number of Problems",
        data: dataPremium.map(({ total_count }) => total_count),
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
              text: "Most Premium Tags",
            },
          },
        }}
        data={diagramPremium}
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
              text: "Most Free Tags",
            },
          },
        }}
        data={diagramFree}
      />
    </ChartWrapper>
  );
}
