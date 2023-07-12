import { useSetSelectedVisualization } from "@/providers/SelectedVisualizationProvider";
import { allDiagramFetcher } from "@/utils/api";
import { AnalysisDataMiniListFetched } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ComplexityBadge from "./ComplexityBadge";

function VisualizationMenu({ showAfter }: { showAfter: boolean }) {
  const setSelectedViz = useSetSelectedVisualization();
  const { data, status } = useQuery<AnalysisDataMiniListFetched>({
    queryKey: ["diagramList"],
    queryFn: allDiagramFetcher,
  });

  return (
    <div
      role="table"
      className={`w-full  max-h-screen overflow-y-scroll box-border  px-4 py-8  ${
        showAfter && data
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-5"
      } transition-all duration-500`}
    >
      <div className="flex w-full pl-4 pb-4 pr-10 box-border" role="rowheader">
        <p className="text-leetcode-text" aria-rowspan={1} aria-colspan={1}>
          Title
        </p>
        <div className="flex-grow"></div>
        <p
          className="text-leetcode-text text-center w-24"
          aria-rowspan={1}
          aria-colspan={1}
        >
          Complexity
        </p>
      </div>
      <hr className="border-[1px] border-leetcode-border border-opacity-75" />
      {!data
        ? null
        : data.allDiagrams.map((selectedDiagram, index) => {
            return (
              <div
                key={selectedDiagram.id}
                className="w-full flex items-start justify-start odd:bg-leetcode-bg even:bg-leetcode-bg-even box-border pl-4 pr-10 py-4 rounded-sm"
                role="row"
              >
                <a href={"#content"} className="group relative w-[600px]">
                  <button
                    className="w-full"
                    onClick={() => {
                      setSelectedViz({
                        ...selectedDiagram,
                        nthDiagram: index + 1,
                      });
                    }}
                  >
                    <div className="truncate w-full text-ellipsis">
                      <p className="text-left">
                        {index + 1}. {selectedDiagram.title}
                      </p>
                    </div>
                  </button>
                </a>
                <div className="flex-grow"></div>
                <div className="text-left self-start">
                  <ComplexityBadge
                    complexity={selectedDiagram.complexity}
                    noBackground={true}
                    fixedWidth={true}
                  />
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default VisualizationMenu;
