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

export type Diagram4 = {
  number: number;
  log_number_of_submission: number;
}[];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Diagram4() {
  const { data, status } = useQuery<RawDiagramData<Diagram4>>({
    queryFn: async () => await diagramDataFetcher<Diagram4>(4),
    queryKey: ["fourthDiagram"],
  });

  if (status !== "success" || !data) {
    return <></>;
  }

  return <></>;
}
