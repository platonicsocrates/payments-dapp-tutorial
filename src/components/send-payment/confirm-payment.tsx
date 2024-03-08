// This component is responsible for rendering the confirmation screen for a payment transaction.
// It receives various props including the amount, destination, fee, public key, and other necessary details.
// The ConfirmPayment component displays the transaction details such as network, recipient, amount, fee, and memo.
// It also provides a button to sign the transaction using a service called Freighter.

import React from "react";
import { Button, Heading, Profile } from "@stellar/design-system";
import { StellarWalletsKit } from "stellar-wallets-kit";
import { xlmToStroop } from "../../helpers/format";
import { NetworkDetails, signTx } from "../../helpers/network";
