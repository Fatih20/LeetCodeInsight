"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useInterval } from "@react-hooks-library/core";
import Content from "@/components/Content";

export default function Home() {
  const [shadeAmount, setShadeAmount] = useState(1);

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
      <main className="flex min-h-screen flex-col items-center w-full">
        <section
          id="title"
          className="h-screen flex flex-col w-full items-center justify-start"
        >
          <div className="flex flex-col flex-grow h-full items-center justify-center">
            <h1 className="text-center text-4xl font-bold">
              {shadeAmount} shades of
              <br />
              <span className="font-mono">LeetCode</span>
            </h1>
          </div>
          <a
            href="#content"
            className="flex flex-col group pb-4 opacity-75 hover:opacity-100 transition-opacity"
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              className="group-hover:translate-y-2 transition-transform h-9"
            />
          </a>
        </section>
        <Content />
      </main>
    </>
  );
}
