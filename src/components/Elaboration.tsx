"use client";

import React, { useState } from "react";
import { StructuredText } from "react-datocms/structured-text";

function Elaboration() {
  const [isQuery, setIsQuery] = useState(false);
  return (
    <section className="w-full flex flex-col items-center justify-start gap-4">
      <div className="w-fit border-b-2 border-opacity-75 border-leetcode-border flex gap-4">
        <button
          className={`flex flex-col gap-2 ${
            isQuery ? "opacity-100" : "opacity-50"
          } text-xl  hover:text-white text-white normal-case`}
          onClick={() => setIsQuery(true)}
        >
          {isQuery ? (
            <h3>Query</h3>
          ) : (
            <p className="text-leetcode-text">Query</p>
          )}
          <div
            className={`w-full h-1 ${
              isQuery ? "bg-leetcode-underline" : "bg-transparent"
            }`}
          ></div>
        </button>
        <button
          className={`flex flex-col ${
            !isQuery ? "opacity-100" : "opacity-50"
          } text-xl gap-2 hover:text-white text-white normal-case`}
          onClick={() => setIsQuery(false)}
        >
          {!isQuery ? (
            <h3>Insight</h3>
          ) : (
            <p className="text-leetcode-text">Insight</p>
          )}
          <div
            className={`w-full h-1  ${
              !isQuery ? "bg-leetcode-underline" : "bg-transparent"
            }`}
          ></div>
        </button>
      </div>
      <div className="flex flex-col items-center justify-start max-w-3xl w-full">
        {isQuery ? (
          <div className="w-full">
            <div className="mockup-code">
              <pre>
                <code>npm i daisyui</code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="w-full text-xl">
            <StructuredText data={null} />
          </div>
        )}
      </div>
    </section>
  );
}

export default Elaboration;
