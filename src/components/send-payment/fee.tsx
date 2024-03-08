// Hey there! This is a component called "Fee" that handles payment settings.
// It's a functional component that takes in some props.

import React, { ChangeEvent } from "react";
import { Button, Heading, Input } from "@stellar/design-system";

// These are the props that the component expects.
interface FeeProps {
  fee: string; // The fee for the payment
  memo: string; // The memo for the payment
  onClick: () => void; // Function to handle the "Next" button click
  setFee: (fee: string) => void; // Function to set the fee value
  setMemo: (memo: string) => void; // Function to set the memo value
}

// This is the Fee component itself.
export const Fee = (props: FeeProps) => {
  // This function handles the change event for the fee input field.
  const handleFeeChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setFee(event.target.value); // Call the setFee function with the new fee value
  };

  // This function handles the change event for the memo input field.
  const handleMemoChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setMemo(event.target.value); // Call the setMemo function with the new memo value
  };

  // The component renders some UI elements.
  return (
    <>
      <Heading as="h1" size="sm">
        Payment Settings
      </Heading>
      <Input
        fieldSize="md"
        id="input-fee"
        label="Estimated Fee (XLM)"
        value={props.fee} // Display the current fee value
        onChange={handleFeeChange} // Call the handleFeeChange function when the fee input changes
