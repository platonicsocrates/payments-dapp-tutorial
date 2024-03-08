import React from "react";
import { createPortal } from "react-dom";
import BigNumber from "bignumber.js";
import {
  Card,
  Caption,
  Layout,
  Notification,
  Profile,
  Loader,
} from "@stellar/design-system";
import {
  StellarWalletsKit,
  WalletNetwork,
  WalletType,
  ISupportedWallet,
} from "stellar-wallets-kit";

import { stroopToXlm } from "../../helpers/format";
import { FUTURENET_DETAILS } from "../../helpers/network";
import { ERRORS } from "../../helpers/error";
import {
  getEstimatedFee,
  getTxBuilder,
  BASE_FEE,
  XLM_DECIMALS,
  getTokenSymbol,
  getTokenDecimals,
  getTokenBalance,
  getServer,
  submitTx,
} from "../../helpers/soroban";

import { SendAmount } from "./send-amount";
import { ConnectWallet } from "./connect-wallet";
