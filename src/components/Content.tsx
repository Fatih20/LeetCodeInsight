"use client";

import { analysisDataCoreFetcher } from "@/utils/api";
import { AnalysisDataCore } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { StructuredText } from "react-datocms/structured-text";
import ComplexityBadge from "./ComplexityBadge";
import { highlight } from "sql-highlight";
import Diagrams from "./Diagrams/Diagrams";

function Content({
  id,
  title,
  nthDiagram,
}: {
  id: string;
  title: string;
  nthDiagram: number;
}) {
  const [isInsight, setIsInsight] = useState(true);
  const { data, status } = useQuery<{ allDiagrams: AnalysisDataCore[] }>({
    queryKey: [id, "Core"],
    queryFn: () => analysisDataCoreFetcher(id),
  });
  return (
    <div className="h-screen w-full bg-leetcode-bg bg-opacity-100 box-border pt-4 px-2 flex flex-col justify-start items-center gap-6">
      <section className="w-full flex flex-col items-start justify-start h-full">
        <div className="border-b-2 w-full border-opacity-75 border-leetcode-border flex items-end justify-start gap-6 bg-opacity-100 bg-leetcode-dark-2 px-4 rounded-t h-10">
          <button
            className={`flex flex-col ${
              isInsight ? "opacity-100" : "opacity-50"
            } text-sm gap-1 hover:text-white text-white normal-case`}
            onClick={() => setIsInsight(true)}
          >
            <p className={`${!isInsight ? "text-leetcode-text" : null}`}>
              Insight
            </p>
            <div
              className={`w-full h-1  ${
                isInsight ? "bg-leetcode-underline" : "bg-transparent"
              }`}
            ></div>
          </button>
          <button
            className={`flex flex-col gap-1 ${
              !isInsight ? "opacity-100" : "opacity-50"
            } text-sm  hover:text-white text-white normal-case`}
            onClick={() => setIsInsight(false)}
          >
            <p className={`${isInsight ? "text-leetcode-text" : null}`}>
              Visualization
            </p>
            <div
              className={`w-full h-1 ${
                !isInsight ? "bg-leetcode-underline" : "bg-transparent"
              }`}
            ></div>
          </button>
        </div>
        <div className="flex w-full flex-grow gap-2">
          <div
            className="flex flex-col items-center justify-start
        w-1/2 box-border p-5 bg-leetcode-bg-lighter bg-opacity-100
         overflow-y-auto"
          >
            {isInsight ? (
              <div className="w-full flex flex-col items-start justify-start">
                <h2 className="text-lg self-start mb-1">
                  {status !== "success" ? "..." : `${nthDiagram}. ${title}`}
                </h2>
                {!data ? null : (
                  <ComplexityBadge
                    complexity={data?.allDiagrams[0].complexity}
                  />
                )}
                <div className="text-base mt-4">
                  <StructuredText data={data?.allDiagrams[0].insight} />
                </div>
              </div>
            ) : (
              <Diagrams nth={nthDiagram} />
            )}
          </div>
          <div className="bg-leetcode-bg-lighter bg-opacity-100 w-1/2 rounded-none  before:hidden text-leetcode-code box-border p-4">
            <pre>
              <code
                className="font-mono-leetcode"
                dangerouslySetInnerHTML={{
                  __html: highlight(data?.allDiagrams[0].query ?? "", {
                    html: true,
                  }),
                }}
              />
            </pre>
          </div>
        </div>
      </section>{" "}
    </div>
  );
}

export default Content;
