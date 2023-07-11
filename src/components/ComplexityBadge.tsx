import { Complexity } from "@/utils/types";
import React from "react";

function ComplexityBadge({
  complexity,
  noBackground,
  fixedWidth,
}: {
  complexity: Complexity;
  noBackground?: boolean;
  fixedWidth?: boolean;
}) {
  if (complexity === "Complicated") {
    return (
      <p
        className={`w-fit py-1 px-[0.625rem] rounded-[21px] bg-leetcode-red ${
          noBackground ? "bg-opacity-0" : "bg-opacity-[0.15]"
        } ${fixedWidth ? "w-20" : ""} text-opacity-100 text-leetcode-red`}
      >
        {complexity}
      </p>
    );
  }

  if (complexity === "Moderate") {
    return (
      <p
        className={`w-fit py-1 px-[0.625rem] rounded-[21px] bg-leetcode-yellow ${
          noBackground ? "bg-opacity-0" : "bg-opacity-[0.15]"
        } ${fixedWidth ? "w-20" : ""}  text-opacity-100 text-leetcode-yellow`}
      >
        {complexity}
      </p>
    );
  }

  return (
    <p
      className={`w-fit py-1 px-[0.625rem] rounded-[21px] bg-leetcode-olive ${
        noBackground ? "bg-opacity-0" : "bg-opacity-[0.15]"
      } text-opacity-100  text-leetcode-olive`}
    >
      {complexity}
    </p>
  );
}

export default ComplexityBadge;
