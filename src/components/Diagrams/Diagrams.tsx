import React from "react";
import First from "./First";

function Diagrams({ nth }: { nth: number }) {
  switch (nth) {
    case 1:
      return <First />;
      break;

    default:
      return <></>;
      break;
  }
}

export default Diagrams;
