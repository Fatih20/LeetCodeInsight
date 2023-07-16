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

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Diagram5() {
  const { data, status } = useQuery<RawDiagramData<Diagram5>>({
    queryFn: async () => await diagramDataFetcher<Diagram5>(5),
    queryKey: ["fiveDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  return <></>;
}
