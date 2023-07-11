"use client";

import React, { useState } from "react";
import Elaboration from "./Elaboration";
import { StructuredText } from "react-datocms/structured-text";

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
  return (
    <section className="h-screen w-full bg-leetcode-bg-lighter bg-opacity-100 box-border p-10 flex flex-col justify-start items-center gap-6">
      <section className="w-full flex flex-col items-start justify-start gap-4">
        <div className="w-fit border-b-2 border-opacity-75 border-leetcode-border flex gap-2">
          <button
            className={`flex flex-col ${
              !isInsight ? "opacity-100" : "opacity-50"
            } text-sm gap-1 hover:text-white text-white normal-case`}
            onClick={() => setIsInsight(false)}
          >
            <p className={`${isInsight ? "text-leetcode-text" : null}`}>
              Visualization
            </p>
            <div
              className={`w-full h-1  ${
                !isInsight ? "bg-leetcode-underline" : "bg-transparent"
              }`}
            ></div>
          </button>
          <button
            className={`flex flex-col gap-1 ${
              isInsight ? "opacity-100" : "opacity-50"
            } text-sm  hover:text-white text-white normal-case`}
            onClick={() => setIsInsight(true)}
          >
            <p className={`${!isInsight ? "text-leetcode-text" : null}`}>
              Insight
            </p>
            <div
              className={`w-full h-1 ${
                isInsight ? "bg-leetcode-underline" : "bg-transparent"
              }`}
            ></div>
          </button>
        </div>
        <div className="flex flex-col items-center justify-start max-w-3xl w-full">
          {isInsight ? (
            <div className="w-full">
              <div className="mockup-code">
                <pre>
                  <code>npm i daisyui</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="w-full text-xl">
              <h2 className="text-lg self-start">
                {nthDiagram}. {title}
              </h2>
              <StructuredText data={null} />
            </div>
          )}
        </div>
      </section>{" "}
    </section>
  );
}

export default Content;
