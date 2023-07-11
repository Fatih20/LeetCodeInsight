"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useInterval } from "@react-hooks-library/core";
import Bottom from "@/components/Bottom";
import VisualizationMenu from "@/components/VisualizationMenu";
import { useSelectedVisualization } from "@/providers/SelectedVisualizationProvider";

export default function Home() {
  const [shadeAmount, setShadeAmount] = useState(0);
  const [showFatih, setShowFatih] = useState(false);
  const selectedViz = useSelectedVisualization();

  const target = 25;
  useInterval(
    () => {
      setShadeAmount((prev) => prev + 1);
      if (shadeAmount >= target - 1) {
        setShowFatih(true);
      }
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
            <div className="relative z-10 flex flex-col flex-grow h-full items-center justify-center gap-4">
              {shadeAmount > 0 && (
                <h1 className="text-center text-5xl shadow-lg font-bold">
                  <span className="text-6xl">{shadeAmount}</span>
                  <br />{" "}
                  <span className="relative z-50">
                    shades
                    {[1, 2].map((number) => (
                      <span
                        key={number}
                        className={`absolute -z-10 left-0 animate-lightColorChange blur-lg select-none transition-opacity duration-500 ${
                          shadeAmount >= target ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        shades
                      </span>
                    ))}
                  </span>{" "}
                  <br />
                  <span className="text-4xl">of</span>
                  <br />
                  <a
                    href="https://leetcode.com/problemset/all/"
                    target="_blank"
                  >
                    <span className="relative font-mono-leetcode z-50">
                      LeetCode
                      {[1, 2, 3].map((number) => (
                        <span
                          key={number}
                          className={`absolute -z-10 left-0 animate-leetcodeColorChange blur-lg transition-opacity duration-500 select-none ${
                            shadeAmount >= target ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          LeetCode
                        </span>
                      ))}
                    </span>
                  </a>
                </h1>
              )}
              <p
                className={`  text-center text-leetcode-text text-lg${
                  showFatih
                    ? " translate-y-0 opacity-100"
                    : " opacity-0 -translate-y-5"
                } transition-all`}
              >
                Created by <br />
                Fatih Nararya R.I.
              </p>
            </div>
            <a
              href="#content"
              className={`flex flex-col group pb-4 hover:opacity-100 transition-opacity ${
                selectedViz ? "opacity-75 visible" : "invisible  opacity-0"
              } duration-1000`}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className="group-hover:translate-y-2 transition-transform h-9"
              />
            </a>
          </section>
          <VisualizationMenu showAfter={shadeAmount >= target} />
        </div>
        <Bottom></Bottom>
      </main>
    </>
  );
}
