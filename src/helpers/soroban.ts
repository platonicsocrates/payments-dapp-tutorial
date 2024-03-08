// Importing necessary dependencies
import {
  Address,
  Contract,
  Memo,
  MemoType,
  nativeToScVal,
  Operation,
  scValToNative,
  SorobanRpc,
  TimeoutInfinite,
  Transaction,
  TransactionBuilder,
  xdr,
} from "@stellar/stellar-sdk";

import BigNumber from "bignumber.js";
import { NetworkDetails } from "./network";
import { stroopToXlm } from "./format";
import { ERRORS } from "./error";

// TODO: once soroban supports estimated fees, we can fetch this

// Defining the base fee for transactions
export const BASE_FEE = "100";
export const baseFeeXlm = stroopToXlm(BASE_FEE).toString();

// Mapping of send transaction status
export const SendTxStatus: {
  [index: string]: SorobanRpc.Api.SendTransactionStatus;
} = {
  Pending: "PENDING",
  Duplicate: "DUPLICATE",
  Retry: "TRY_AGAIN_LATER",
  Error: "ERROR",
};

// Defining the number of decimal places for XLM
export const XLM_DECIMALS = 7;

// Mapping of network URLs
export const RPC_URLS: { [key: string]: string } = {
  FUTURENET: "https://rpc-futurenet.stellar.org/",
};

// Function to convert an account address to a smart contract value
export const accountToScVal = (account: string) =>
  new Address(account).toScVal();

// Function to convert a number to a smart contract value
export const numberToI128 = (value: number): xdr.ScVal =>
  nativeToScVal(value, { type: "i128" });

// Function to parse a token amount from a display value and number of decimals
export const parseTokenAmount = (value: string, decimals: number) => {
  const comps = value.split(".");

  let whole = comps[0];
  let fraction = comps[1];
  if (!whole) {
    whole = "0";
  }
  if (!fraction) {
    fraction = "0";
  }

  // Trim trailing zeros
  while (fraction[fraction.length - 1] === "0") {
    fraction = fraction.substring(0, fraction.length - 1);
  }

  // If decimals is 0, we have an empty string for fraction
  if (fraction === "") {
    fraction = "0";
  }

  // Fully pad the string with zeros to get to value
  while (fraction.length < decimals) {
    fraction += "0";
  }

  const wholeValue = new BigNumber(whole);
  const fractionValue = new BigNumber(fraction);

  return wholeValue.shiftedBy(decimals).plus(fractionValue);
};

// Function to get a server configured for a specific network
