// Hey there! This is a component called SendAmount. It's responsible for rendering a form where users can enter the amount they want to send.

import React, { ChangeEvent } from "react";
import BigNumber from "bignumber.js";
import { Button, Heading, Input } from "@stellar/design-system";
import { formatTokenAmount } from "../../helpers/format";

interface SendAmountProps {
  amount: string; // The amount the user wants to send
  decimals: number; // The number of decimal places for the token
  balance: string; // The user's account balance
  onClick: () => void; // Function to handle the "Next" button click
  setAmount: (amount: string) => void; // Function to update the amount value
  tokenSymbol: string; // The symbol of the token being sent
}

export const SendAmount = (props: SendAmountProps) => {
  // User needs to have enough tokens to transfer the amount they have provided
  const canFulfillPayment = new BigNumber(props.amount).isLessThanOrEqualTo(
    new BigNumber(props.balance),
  );

  // Function to handle changes in the input field
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setAmount(event.target.value);
  };

  return (
    <>
      {/* Display the available balance */}
      <Heading as="h1" size="sm" addlClassName="title">
        Available Balance
      </Heading>
      <Heading size="sm" as="h2" addlClassName="balance">
        {formatTokenAmount(new BigNumber(props.balance), props.decimals)}{" "}
        {props.tokenSymbol}
      </Heading>

      {/* Input field for the user to enter the amount */}
      <Input
