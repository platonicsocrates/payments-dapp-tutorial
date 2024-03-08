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

