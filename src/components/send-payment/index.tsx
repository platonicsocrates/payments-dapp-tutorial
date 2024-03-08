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
        memo,
        server,
      );
      setFee(stroopToXlm(estimatedFee).toString());
      setIsGettingFee(false);
    } catch (error) {
      // Defaults to hardcoded base fee if this fails
      console.log(error);
      setIsGettingFee(false);
    }
  };

  // Function to render the currently active step in the payment flow
  function renderStep(step: StepCount) {
    switch (step) {
      case 8: {
        // Display the transaction result
        const onClick = () => setStepCount(1);
        return <TxResult onClick={onClick} resultXDR={txResultXDR} />;
      }
      case 7: {
        // Submit the transaction to the network
        const submit = async () => {
          setConnectionError(null);
          setIsSubmitting(true);
          try {
            const server = getServer(selectedNetwork);
            const result = await submitTx(
              signedXdr,
              selectedNetwork.networkPassphrase,
              server,
            );

            settxResultXDR(result);
            setIsSubmitting(false);

            setStepCount((stepCount + 1) as StepCount);
          } catch (error) {
            console.log(error);
            setIsSubmitting(false);
            setConnectionError(ERRORS.UNABLE_TO_SUBMIT_TX);
          }
        };
        return (
          <SubmitPayment
            network={selectedNetwork.network}
            destination={paymentDestination}
            amount={sendAmount}
            tokenSymbol={tokenSymbol}
            fee={fee}
            signedXdr={signedXdr}
            isSubmitting={isSubmitting}
            memo={memo}
            onClick={submit}
          />
        );
      }
      case 6: {
        // Confirm the payment details and sign the transaction
        const setSignedTx = (xdr: string) => {
          setConnectionError(null);
          setSignedXdr(xdr);
          setStepCount((stepCount + 1) as StepCount);
        };
        return (
          <ConfirmPayment
            tokenId={tokenId}
            tokenDecimals={tokenDecimals}
            pubKey={activePubKey!}
            tokenSymbol={tokenSymbol}
            onTxSign={setSignedTx}
            network={selectedNetwork.network}
            destination={paymentDestination}
            amount={sendAmount}
            fee={fee}
            memo={memo}
            networkDetails={selectedNetwork}
            kit={SWKKit}
            setError={setConnectionError}
          />
        );
      }
      case 5: {
        // Set the fee and memo for the payment
        const onClick = () => setStepCount((stepCount + 1) as StepCount);
        return (
          <Fee
            fee={fee}
            memo={memo}
            onClick={onClick}
            setFee={setFee}
            setMemo={setMemo}
          />
        );
      }
      case 4: {
        // Set the amount to send in the payment
        const onClick = async () => {
          // Set the estimated fee for the next step
          await getFee();
          setStepCount((stepCount + 1) as StepCount);
        };

        if (isGettingFee) {
          return (
            <div className="loading">
              <Loader />
            </div>
          );
        }

        return (
          <SendAmount
            amount={sendAmount}
            decimals={tokenDecimals}
            setAmount={setSendAmount}
            onClick={onClick}
            balance={tokenBalance}
            tokenSymbol={tokenSymbol}
          />
        );
      }
      case 3: {
        // Select the token for the payment
        if (isLoadingTokenDetails) {
          return (
            <div className="loading">
              <Loader />
            </div>
          );
        }
        const onClick = async (value: string) => {
          const success = await setToken(value);
