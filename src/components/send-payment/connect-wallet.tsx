// Hey there! This is a component called ConnectWallet.
// It's responsible for rendering a form to connect a wallet and send a Soroban payment.

import React from "react";
import { Button, Heading, Select } from "@stellar/design-system";

// Here we define the props that this component expects.
// It needs the selected network, public key, and a function to handle the click event.
interface ConnectWalletProps {
  selectedNetwork: string;
  pubKey: string | null;
  onClick: () => void;
}

// This is the actual component function.
// It receives the props as an argument and returns the JSX to be rendered.
export const ConnectWallet = (props: ConnectWalletProps) => {
  // Let's determine the text to be displayed on the button.
  // If the public key is available, we show "Next", otherwise "Connect Freighter".
  const text = props.pubKey ? "Next" : "Connect Freighter";

  return (
    <>
      {/* This is the heading for the form */}
      <Heading as="h1" size="sm">
        Send a Soroban Payment
      </Heading>

      {/* This is a disabled select input to show the selected network */}
      <Select
        disabled
        fieldSize="md"
        id="selected-network"
        label="Select your Network"
        value={props.selectedNetwork}
      >
        {/* We display the selected network as an option */}
        <option>{props.selectedNetwork}</option>
      </Select>

