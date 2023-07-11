import { useSetSelectedVisualization } from "@/providers/SelectedVisualizationProvider";
import { allDiagramFetcher } from "@/utils/api";
import { AnalysisDataMiniListFetched } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function VisualizationMenu() {
  const setSelectedViz = useSetSelectedVisualization();
  const { data, status } = useQuery<AnalysisDataMiniListFetched>({
    queryKey: ["diagramList"],
    queryFn: allDiagramFetcher,
  });
  return (
    <div className="w-full max-h-screen overflow-y-scroll box-border bg-leetcode-bg bg-opacity-100 px-4 py-8">
      <p className="text-leetcode-text">Title</p>
      <hr className="border-[1px] border-leetcode-border border-opacity-75" />
      {!data
        ? null
        : data.allDiagrams.map((selectedDiagram, index) => {
            return (
              <div
                key={selectedDiagram.id}
                className="w-full flex items-start justify-start odd:bg-leetcode-bg even:bg-leetcode-bg-even box-border px-2 py-4 rounded-sm"
              >
                <button
                  className="w-full"
                  onClick={() => {
                    setSelectedViz({
                      ...selectedDiagram,
                      nthDiagram: index + 1,
                    });
                  }}
                >
                  <article className="truncate text-left">
                    <p className="text-left">
                      {index + 1}. {selectedDiagram.title}
                    </p>
                  </article>
                </button>
              </div>
            );
          })}
    </div>
  );
}

export default VisualizationMenu;
