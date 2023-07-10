"use client";

import React, { useEffect } from "react";
import Elaboration from "./Elaboration";
import { useQuery } from "@tanstack/react-query";
import { allDiagramFetcher } from "@/utils/api";
import { DiagramMiniListFetched } from "@/utils/types";

function Content() {
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
    <section
      id="content"
      className="h-screen w-full bg-leetcode-bg bg-opacity-100 box-border p-10 flex flex-col justify-start items-center gap-6"
    >
      <h2 className="text-4xl font-bold">Bruh</h2>
      <Elaboration />
    </section>
  );
}

export default Content;
