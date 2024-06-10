import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return <div className="flex flex-col gap-2 items-center justify-center w-full h-full p-20">
    <CircularProgress />
    <span className="text-lg font-bold">Loading...</span>
  </div>;
};

export default Loading;
