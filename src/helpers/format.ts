import BigNumber from "bignumber.js";

// This function truncates a string and adds ellipsis (...) in the middle
export const truncateString = (str: string) =>
  str ? `${str.slice(0, 5)}…${str.slice(-5)}` : "";

