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

export type Element10 = {
  tag_name: string;
  problem_count: number;
  liked_problem_count: number;
  ratio: number;
};

export type Diagram10 = {
  likes: Element10[];
  dislikes: Element10[];
};

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Diagram10() {
  const { data, status } = useQuery<RawDiagramData<Diagram10>>({
    queryFn: async () => await diagramDataFetcher<Diagram10>(10),
    queryKey: ["fiveDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  return <></>;
}
