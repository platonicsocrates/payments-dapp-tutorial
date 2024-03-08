// Hey there! This is a component called SendAmount. It's responsible for rendering a form where users can enter the amount they want to send.

import React, { ChangeEvent } from "react";
import BigNumber from "bignumber.js";
import { Button, Heading, Input } from "@stellar/design-system";
import { formatTokenAmount } from "../../helpers/format";

interface SendAmountProps {
  amount: string; // The amount the user wants to send
