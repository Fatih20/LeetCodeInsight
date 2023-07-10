import React from "react";
import Elaboration from "./Elaboration";

function Content() {
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
