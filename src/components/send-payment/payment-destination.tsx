// Hey there! This is a component called PaymentDest. It's responsible for rendering a form where users can choose a payment destination.

import React, { ChangeEvent } from "react";
import { Button, Heading, Input } from "@stellar/design-system";

// Here we define the props that this component expects to receive.
interface PaymentDestProps {
  destination: string; // The current payment destination address
  setDestination: (address: string) => void; // A function to update the payment destination address
  onClick: () => void; // A function to handle the "Next" button click
}

// This is the actual component function.
export const PaymentDest = (props: PaymentDestProps) => {
  // This function is triggered whenever the user types in the input field.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setDestination(event.target.value); // We update the payment destination address with the new value entered by the user.
  };

  return (
    <>
      <Heading as="h1" size="sm">
        Choose a Payment Destination
      </Heading>
      <Input
        fieldSize="md"
        id="input-destination"
