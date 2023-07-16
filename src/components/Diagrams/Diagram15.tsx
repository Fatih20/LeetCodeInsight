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

export type Diagram15 = {
  solution_type: SolutionType;
  average_ratio: Number;
  max_ratio: Number;
  min_ratio: Number;
}[];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Diagram15() {
  const { data, status } = useQuery<RawDiagramData<Diagram15>>({
    queryFn: async () => await diagramDataFetcher<Diagram15>(15),
    queryKey: ["fifteenthDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  return <></>;
}
