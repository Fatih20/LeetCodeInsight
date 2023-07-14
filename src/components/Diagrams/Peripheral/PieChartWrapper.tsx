import React from "react";

export default function PieChartWrapper({
  children,
  whatToShow = [true, true],
}: {
  children: React.ReactNode;
  whatToShow?: boolean[];
}) {
  return (
    <div className="w-full flex flex-col items-center justify-start gap-4">
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
      <div className="flex w-4/5 flex-col items-center justify-start gap-5">
        {children}
      </div>
    </div>
  );
}
