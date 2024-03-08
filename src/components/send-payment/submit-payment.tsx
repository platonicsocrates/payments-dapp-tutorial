// Importing necessary components from the Stellar Design System library
import React from "react";
import {
  Button,
  Card,
  Heading,
  IconButton,
  Icon,
  Loader,
  Profile,
} from "@stellar/design-system";

// Importing helper function to copy content
import { copyContent } from "../../helpers/dom";

// Defining the props interface for the SubmitPayment component
interface SubmitPaymentProps {
  amount: string;
  destination: string;
  fee: string;
  isSubmitting: boolean;
  memo: string;
  network: string;
  onClick: () => void;
  signedXdr: string;
  tokenSymbol: string;
}

// Defining the SubmitPayment component
export const SubmitPayment = (props: SubmitPaymentProps) => (
  <>
    {/* Heading for the submit payment section */}
    <Heading as="h1" size="sm">
      Submit Payment
    </Heading>

    {/* Transaction details */}
    <div className="tx-details">
      {/* Network */}
      <div className="tx-detail-item">
        <p className="detail-header">Network</p>
        <p className="detail-value">{props.network}</p>
      </div>

