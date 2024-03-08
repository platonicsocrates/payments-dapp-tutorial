// Hey there! This is a component called TokenInput.
// It's responsible for rendering an input field and a button to choose a token to send.

import React, { ChangeEvent } from "react";
import { Button, Heading, Input } from "@stellar/design-system";

// Let's define the props for this component.
interface TokenInputProps {
  onClick: (value: string) => void;
}

// Now, let's define the TokenInput component.
export const TokenInput = (props: TokenInputProps) => {
  // We're using React hooks here to manage the state of the input field.
  // The value of the input field is stored in the 'value' state variable.
  const [value, setValue] = React.useState("");
