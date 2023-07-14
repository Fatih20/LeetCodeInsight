import React, { useEffect } from "react";
import Content from "./Content";
import { useSelectedVisualization } from "@/providers/SelectedVisualizationProvider";

function Bottom() {
  const selectedViz = useSelectedVisualization();

  if (!selectedViz) {
    return;
  }

  return (
    <div className="flex w-full h-screen" id="content">
      <Content
        id={selectedViz.id}
        title={selectedViz.title}
        nthDiagram={selectedViz.nth}
      />
    </div>
  );
}

export default Bottom;
