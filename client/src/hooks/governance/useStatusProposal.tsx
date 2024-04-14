"use client";
import React, { useState, useEffect } from "react";

const useStatusProposal = (defaultStatus: string) => {
  const [status, setStatus] = useState(defaultStatus);
  return status;
};

export default useStatusProposal;
