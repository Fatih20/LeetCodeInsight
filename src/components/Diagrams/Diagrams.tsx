import React from "react";
import First from "./First";
import Second from "./Second";
import Seventh from "./Seventh";
import Ninth from "./Ninth";
import Thirteenth from "./Thirteenth";

function Diagrams({ nth }: { nth: number }) {
  switch (nth) {
    case 1:
      return <First />;
    case 2:
      return <Second />;
    case 7:
      return <Seventh />;
    case 9:
      return <Ninth />;
    case 13:
      return <Thirteenth />;

    default:
      return <></>;
      break;
  }
}

export default Diagrams;
