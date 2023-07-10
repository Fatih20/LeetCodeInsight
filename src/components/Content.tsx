"use client";

import React from "react";
import Elaboration from "./Elaboration";

function Content({
  id,
  title,
  nthDiagram,
}: {
  id: string;
  title: string;
  nthDiagram: number;
}) {
  return (
    <section className="h-screen w-full bg-leetcode-bg-lighter bg-opacity-100 box-border p-10 flex flex-col justify-start items-center gap-6">
      <h2 className="text-lg self-start">
        {nthDiagram}. {title}
      </h2>
      <Elaboration />
    </section>
  );
}

export default Content;
