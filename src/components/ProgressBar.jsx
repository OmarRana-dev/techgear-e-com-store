import React, { useEffect, useState } from "react";

const ProgressBar = ({ percentage }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg className="transform -rotate-90 w-24 h-24">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke="gray"
          strokeWidth="5"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke="blue"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300"
        />
      </svg>
      <span className="absolute text-lg font-semibold">
        {percentage}%
      </span>
    </div>
  );
};

export default ProgressBar;
