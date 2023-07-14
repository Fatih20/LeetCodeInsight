import React from "react";
import Diagram1 from "../Diagram1";
import Diagram3 from "../Diagram3";
import Diagram2 from "../Diagram2";
import Diagram7 from "../Diagram7";
import Diagram9 from "../Diagram9";
import Diagram12 from "../Diagram12";
import Diagram14 from "../Diagram14";
import Diagram8 from "../Diagram8";
import Diagram6 from "../Diagram6";

function Diagrams({ nth }: { nth: number }) {
  switch (nth) {
    case 1:
      return <Diagram1 />;
    case 2:
      return <Diagram2 />;
    case 3:
      return <Diagram3 />;
    case 6:
      return <Diagram6 />;

    case 7:
      return <Diagram7 />;

    case 8:
      return <Diagram8 />;
    case 9:
      return <Diagram9 />;
    case 12:
      return <Diagram12 />;
    case 14:
      return <Diagram14 />;
    default:
      return <></>;
      break;
  }
}

export default Diagrams;
