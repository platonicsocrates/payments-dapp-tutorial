// Hey there! This is a component called "Fee" that handles payment settings.
// It's a functional component that takes in some props.

import React, { ChangeEvent } from "react";
import { Button, Heading, Input } from "@stellar/design-system";

// These are the props that the component expects.
interface FeeProps {
  fee: string; // The fee for the payment
  memo: string; // The memo for the payment
