// Hey, this is a React component that displays the result of a transaction.
// It takes in two props: resultXDR (which is a string representing the result of the transaction) and onClick (a function to handle the "Start Over" button click).

import React from "react";
import {
  Button,
  Card,
  IconButton,
  Icon,
  Heading,
} from "@stellar/design-system";
import { copyContent } from "../../helpers/dom";

interface TxResultProps {
  resultXDR: string;
  onClick: () => void;
}

export const TxResult = (props: TxResultProps) => (
  <>
    {/* This is the heading for the transaction result */}
    <Heading as="h1" size="sm" addlClassName="title">
      Transaction Result
    </Heading>
    <div className="signed-xdr">
      {/* This is the header for the result XDR */}
      <p className="detail-header">Result XDR</p>
      <Card variant="secondary">
        <div className="xdr-copy">
          {/* This is the button to copy the result XDR */}
          <IconButton
            altText="copy result xdr data"
            icon={<Icon.ContentCopy key="copy-icon" />}
