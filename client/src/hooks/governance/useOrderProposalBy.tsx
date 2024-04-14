"use client";
import React, { useState, useEffect } from "react";

const useOrderProposalBy = () => {
  const [orderBy, setOrderBy] = useState("most-recent");
  useEffect(() => {
    console.log(orderBy);
  }, [orderBy]);
  return orderBy;
};

export default useOrderProposalBy;
