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

// This function converts XLM (Stellar Lumens) to the base fee in stroops
export const xlmToStroop = (lumens: BigNumber | string): BigNumber => {
  if (lumens instanceof BigNumber) {
    return lumens.times(1e7);
  }
  // round to the nearest stroop
  return new BigNumber(Math.round(Number(lumens) * 1e7));
};

// This function formats the token amount based on the number of decimals
// Example - If a user has 1000000001 of a token with 7 decimals, the display should be 100.0000001
