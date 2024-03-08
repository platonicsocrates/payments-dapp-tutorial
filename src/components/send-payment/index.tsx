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
import { PaymentDest } from "./payment-destination";
import { TokenInput } from "./token-input";
import { ConfirmPayment } from "./confirm-payment";
import { Fee } from "./fee";
import { SubmitPayment } from "./submit-payment";
import { TxResult } from "./tx-result";

import "./index.scss";

type StepCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
// This component is responsible for sending payments
interface SendPaymentProps {
  hasHeader?: boolean; // Optional prop to determine if a header should be displayed
}

export const SendPayment = (props: SendPaymentProps) => {
  // This is only needed when this component is consumed by other components that display a different header
  const hasHeader = props.hasHeader === undefined ? true : props.hasHeader;

  // Default to Futurenet network, only supported network for now
  const [selectedNetwork] = React.useState(FUTURENET_DETAILS);

  // Initial state, empty states for token/transaction details
  const [activePubKey, setActivePubKey] = React.useState(null as string | null);
  const [stepCount, setStepCount] = React.useState(1 as StepCount);
  const [connectionError, setConnectionError] = React.useState(
    null as string | null,
  );

  // State variables for token/transaction details
  const [tokenId, setTokenId] = React.useState("");
  const [tokenDecimals, setTokenDecimals] = React.useState(XLM_DECIMALS);
  const [paymentDestination, setPaymentDest] = React.useState("");
  const [sendAmount, setSendAmount] = React.useState("");
  const [tokenSymbol, setTokenSymbol] = React.useState("");
  const [tokenBalance, setTokenBalance] = React.useState("");
  const [fee, setFee] = React.useState(BASE_FEE);
  const [memo, setMemo] = React.useState("");
  const [txResultXDR, settxResultXDR] = React.useState("");
  const [signedXdr, setSignedXdr] = React.useState("");

  // Loading states
  const [isLoadingTokenDetails, setLoadingTokenDetails] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isGettingFee, setIsGettingFee] = React.useState(false);

  // Setup Stellar Wallets Kit (SWK) with the selected network and wallet type
  const [SWKKit] = React.useState(
    new StellarWalletsKit({
      network: selectedNetwork.networkPassphrase as WalletNetwork,
      selectedWallet: WalletType.FREIGHTER,
    }),
  );

  // Whenever the selected network changes, update the network on SWK
  React.useEffect(() => {
    SWKKit.setNetwork(selectedNetwork.networkPassphrase as WalletNetwork);
  }, [selectedNetwork.networkPassphrase, SWKKit]);

  // Function to fetch token details based on the provided token ID
  async function setToken(id: string) {
    setLoadingTokenDetails(true);
    setTokenId(id);

    // Get an instance of a Soroban RPC server for the selected network
    const server = getServer(selectedNetwork);

    try {
      // Get the symbol for the set token ID
      const symbol = await getTokenSymbol(id, server);
      setTokenSymbol(symbol);

      // Get the current token balance for the selected token
      const balance = await getTokenBalance(activePubKey!, id, server);
      setTokenBalance(balance);

      // Get the number of decimals set for the selected token
      const decimals = await getTokenDecimals(id, server);
      setTokenDecimals(decimals);
      setLoadingTokenDetails(false);

      return true;
    } catch (error) {
      console.log(error);
      setConnectionError("Unable to fetch token details.");
      setLoadingTokenDetails(false);

      return false;
    }
  }

  // Function to get the estimated fee for the payment
  const getFee = async () => {
    setIsGettingFee(true);
    const server = getServer(selectedNetwork);

    try {
      const estimatedFee = await getEstimatedFee(
        tokenId,
        new BigNumber(sendAmount).toNumber(),
        paymentDestination,
        activePubKey!,
