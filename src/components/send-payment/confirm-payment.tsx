// This component is responsible for rendering the confirmation screen for a payment transaction.
// It receives various props including the amount, destination, fee, public key, and other necessary details.
// The ConfirmPayment component displays the transaction details such as network, recipient, amount, fee, and memo.
// It also provides a button to sign the transaction using a service called Freighter.

import React from "react";
import { Button, Heading, Profile } from "@stellar/design-system";
import { StellarWalletsKit } from "stellar-wallets-kit";
import { xlmToStroop } from "../../helpers/format";
import { NetworkDetails, signTx } from "../../helpers/network";
import {
  makePayment,
  getTxBuilder,
  parseTokenAmount,
  getServer,
} from "../../helpers/soroban";
import { ERRORS } from "../../helpers/error";

// Define the props that ConfirmPayment component receives
interface ConfirmPaymentProps {
  amount: string;
  destination: string;
  fee: string;
  pubKey: string;
  kit: StellarWalletsKit;
  memo: string;
  network: string;
  onTxSign: (xdr: string) => void;
  tokenId: string;
  tokenDecimals: number;
  tokenSymbol: string;
  networkDetails: NetworkDetails;
  setError: (error: string) => void;
}

// Define the ConfirmPayment component
export const ConfirmPayment = (props: ConfirmPaymentProps) => {
  // Function to sign the transaction using Freighter
  const signWithFreighter = async () => {
    // Convert the amount to the appropriate format based on the token decimals
    const amount = parseTokenAmount(props.amount, props.tokenDecimals);

    // Get an instance of a Soroban RPC set to the selected network
    const server = getServer(props.networkDetails);

    // Get a transaction builder and use it to add a "transfer" operation and build the corresponding XDR
    const builder = await getTxBuilder(
      props.pubKey,
      xlmToStroop(props.fee).toString(),
      server,
      props.networkDetails.networkPassphrase,
    );
    const xdr = await makePayment(
      props.tokenId,
      amount.toNumber(),
      props.destination,
      props.pubKey,
      props.memo,
      builder,
      server,
    );

    try {
      // Sign the XDR representing the "transfer" transaction using the provided public key and StellarWalletsKit
      const signedTx = await signTx(xdr, props.pubKey, props.kit);
      props.onTxSign(signedTx);
    } catch (error) {
      console.log(error);
