import React, { useState } from "react";

function Elaboration() {
  const [isQuery, setIsQuery] = useState(false);
  return (
    <section className="w-full flex flex-col items-center justify-start gap-4">
      <div className="w-fit border-b-2 border-opacity-75 border-leetcode-border flex gap-2 font-bold pb-2">
        <button
          className={`${
            isQuery ? "opacity-100" : "opacity-50"
          } btn btn-md btn-ghost  text-xl text-leetcode-orange normal-case`}
          onClick={() => setIsQuery(true)}
        >
          {isQuery ? <h3>Query</h3> : <p className="text-[#eff1f6bf]">Query</p>}
        </button>
        <button
          className={`${
            !isQuery ? "opacity-100" : "opacity-50"
          } btn btn-md btn-ghost  text-xl text-leetcode-orange normal-case`}
          onClick={() => setIsQuery(false)}
        >
          {!isQuery ? (
            <h3>Insight</h3>
          ) : (
            <p className="text-[#eff1f6bf]">Insight</p>
          )}
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
          <div className="w-full text-xl">ksndcldscncldsc</div>
        )}
      </div>
    </section>
  );
}

export default Elaboration;
