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
