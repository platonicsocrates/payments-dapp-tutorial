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

      {/* Recipient */}
      <div className="tx-detail-item">
        <p className="detail-header">To</p>
        <div className="dest-identicon">
          {/* Displaying the recipient's profile picture */}
          <Profile isShort publicAddress={props.destination} size="sm" />
        </div>
      </div>

      {/* Amount */}
      <div className="tx-detail-item">
        <p className="detail-header">Amount</p>
        <p className="detail-value">
          {/* Displaying the payment amount and token symbol */}
          {props.amount} {props.tokenSymbol}
        </p>
      </div>

      {/* Fee */}
      <div className="tx-detail-item">
        <p className="detail-header">Fee</p>
        <p className="detail-value">{props.fee} XLM</p>
      </div>

      {/* Memo */}
      <div className="tx-detail-item">
        <p className="detail-header">Memo</p>
        <p className="detail-value">{props.memo}</p>
      </div>
    </div>

    {/* Signed XDR */}
    <div className="signed-xdr">
      <p className="detail-header">Signed XDR</p>
      <Card variant="secondary">
        <div className="xdr-copy">
          {/* Button to copy the signed XDR data */}
          <IconButton
            altText="copy signed xdr data"
            icon={<Icon.ContentCopy key="copy-icon" />}
            onClick={() => copyContent(props.signedXdr)}
          />
        </div>
        <div className="xdr-data">{props.signedXdr}</div>
      </Card>
