import BigNumber from "bignumber.js";

// This function truncates a string and adds ellipsis (...) in the middle
export const truncateString = (str: string) =>
  str ? `${str.slice(0, 5)}…${str.slice(-5)}` : "";

// This function converts the base fee from stroops to XLM (Stellar Lumens)
export const stroopToXlm = (
  stroops: BigNumber | string | number,
): BigNumber => {
  if (stroops instanceof BigNumber) {
    return stroops.dividedBy(1e7);
  }
  return new BigNumber(Number(stroops) / 1e7);
};

