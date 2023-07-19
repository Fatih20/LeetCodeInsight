import React from "react";

export default function ChartWrapper({
  children,
  whatToShow = [true, true],
  fullWidth = false,
}: {
  children: React.ReactNode;
  whatToShow?: boolean[];
  fullWidth?: boolean;
}) {
  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 h-full">
      <ul className="flex flex-col items-start justify-start text-sm">
        {whatToShow[0] && (
          <li className="self-start">
            Hover over the inner circle for percentage and outer circle for the
            exact amount
          </li>
        )}
        {whatToShow[1] && (
          <li className="self-start">
            Click the legend to temporarily toggle the corresponding data out of
            view
          </li>
        )}
      </ul>
      <div
        className={`flex ${
          fullWidth ? "w-full px-2 box-border" : "w-4/5"
        } flex-col items-center justify-start gap-5 h-full`}
      >
        {children}
      </div>
    </div>
  );
}
