// Hey there! This is a component called ConnectWallet.
// It's responsible for rendering a form to connect a wallet and send a Soroban payment.

import React from "react";
import { Button, Heading, Select } from "@stellar/design-system";

// Here we define the props that this component expects.
// It needs the selected network, public key, and a function to handle the click event.
interface ConnectWalletProps {
  selectedNetwork: string;
  pubKey: string | null;
