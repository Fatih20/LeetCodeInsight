"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useInterval } from "@react-hooks-library/core";
import Bottom from "@/components/Bottom";
import VisualizationMenu from "@/components/VisualizationMenu";
import { useSelectedVisualization } from "@/providers/SelectedVisualizationProvider";

export default function Home() {
  const [shadeAmount, setShadeAmount] = useState(1);
  const selectedViz = useSelectedVisualization();

  const target = 25;
  useInterval(
    () => {
      setShadeAmount((prev) => prev + 1);
    },
    75,
    { paused: shadeAmount >= target }
  );

  return (
    <>
      <main className="bg-leetcode-bg bg-opacity-100 flex min-h-screen flex-col items-center w-full">
        <div className="w-full flex">
          <section
            id="title"
            className="h-screen flex flex-col w-fit items-center justify-start relative box-border px-8"
          >
            <div className="flex flex-col absolute inset-0 justify-center items-center"></div>
            <div className="relative z-10 flex flex-col flex-grow h-full items-center justify-center">
              <h1 className="text-center text-5xl font-bold">
                {shadeAmount} <br /> <span className="">shades</span> <br /> of
                <br />
                <span className="font-mono animate-lightColorChange">
                  LeetCode
                </span>
              </h1>
            </div>
            {!selectedViz ? null : (
              <a
                href="#content"
                className="flex flex-col group pb-4 opacity-75 hover:opacity-100 transition-opacity"
              >
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="group-hover:translate-y-2 transition-transform h-9"
                />
              </a>
            )}
          </section>
          <VisualizationMenu />
        </div>
        <Bottom></Bottom>
      </main>
    </>
  );
}
