"use client";

import { AnalysisDataMini } from "@/utils/types";
import {
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  createContext,
} from "react";

const SelectedVisualizationContext = createContext(
  null as null | (AnalysisDataMini & { nthDiagram: number })
);

const SetSelectedVisualizationContext = createContext<
  Dispatch<SetStateAction<(AnalysisDataMini & { nthDiagram: number }) | null>>
>(() => {});

export const useSelectedVisualization = () => {
  return useContext(SelectedVisualizationContext);
};

export const useSetSelectedVisualization = () => {
  return useContext(SetSelectedVisualizationContext);
};

function SelectedVisualizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedVisualization, setSelectedVisualization] = useState(
    null as null as null | (AnalysisDataMini & { nthDiagram: number })
  );

  return (
    <SelectedVisualizationContext.Provider value={selectedVisualization}>
      <SetSelectedVisualizationContext.Provider
        value={setSelectedVisualization}
      >
        {children}
      </SetSelectedVisualizationContext.Provider>
    </SelectedVisualizationContext.Provider>
  );
}

export default SelectedVisualizationProvider;
