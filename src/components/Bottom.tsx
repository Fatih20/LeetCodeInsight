import React, { useEffect, useState } from "react";
import Content from "./Content";
import { useQuery } from "@tanstack/react-query";
import { allDiagramFetcher } from "@/utils/api";
import { DiagramMini, DiagramMiniListFetched } from "@/utils/types";

function Bottom() {
  const [selectedDiagram, setSelectedDiagram] = useState(
    null as null | (DiagramMini & { nthDiagram: number })
  );
  const { data, status } = useQuery<DiagramMiniListFetched>({
    queryKey: ["diagramList"],
    queryFn: allDiagramFetcher,
  });

  useEffect(() => {
    if (status === "success") {
      console.log(data);
    }
  }, [status, data]);
  return (
    <div className="flex w-full min-h-screen" id="content">
      <div className="w-1/3 box-border bg-leetcode-bg bg-opacity-100 px-4 py-8">
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
                    onClick={() =>
                      setSelectedDiagram({
                        ...selectedDiagram,
                        nthDiagram: index + 1,
                      })
                    }
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
      {selectedDiagram !== null && (
        <Content
          id={selectedDiagram.id}
          title={selectedDiagram.title}
          nthDiagram={selectedDiagram.nthDiagram}
        />
      )}
    </div>
  );
}

export default Bottom;
