import React, { useEffect, useState } from "react";
import Content from "./Content";
import { useQuery } from "@tanstack/react-query";
import { allDiagramFetcher } from "@/utils/api";
import { DiagramMiniListFetched } from "@/utils/types";

function Bottom() {
  const [selectedDiagram, setSelectedDiagram] = useState(null as null | string);
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
          : data.allDiagrams.map(({ id, title }, index) => {
              return (
                <button onClick={() => setSelectedDiagram(id)} key={id}>
                  <article className="truncate odd:bg-leetcode-bg even:bg-leetcode-bg-even w-full box-border px-2 py-4 rounded-sm">
                    {index + 1}. {title}
                  </article>
                </button>
              );
            })}
      </div>
      {selectedDiagram !== null && <Content id={selectedDiagram} />}
    </div>
  );
}

export default Bottom;
