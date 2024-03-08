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
