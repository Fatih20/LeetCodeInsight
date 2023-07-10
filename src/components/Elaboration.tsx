import React, { useState } from "react";

function Elaboration() {
  const [isQuery, setIsQuery] = useState(false);
  return (
    <section className="w-full flex flex-col items-center justify-start gap-4">
      <div className="w-fit border-b-2 border-black flex gap-4 font-bold text-xl">
        <button
          className={`${isQuery ? "opacity-100" : "opacity-50"}`}
          onClick={() => setIsQuery(true)}
        >
          {isQuery ? <h3>Query</h3> : <p>Query</p>}
        </button>
        <button
          className={`${!isQuery ? "opacity-100" : "opacity-50"}`}
          onClick={() => setIsQuery(false)}
        >
          {!isQuery ? <h3>Insight</h3> : <p>Insight</p>}
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
