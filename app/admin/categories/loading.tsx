"use client"
import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";

export default function Loading() {
  return (
       <div className="flex items-center justify-center min-h-screen w-full">
        <LineSpinner size="40" stroke="3" speed="1" />
      </div>
  );
}