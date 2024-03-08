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

  // This function is called whenever the value of the input field changes.
  // It updates the 'value' state variable with the new value.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // This function is called when the button is clicked.
  // It calls the 'onClick' function passed as a prop, and passes the current value of the input field as an argument.
  const onClick = () => {
    props.onClick(value);
  };

  // Now, let's render the component.
  return (
    <>
      {/* This is a heading that says "Choose Token To Send". */}
      <Heading as="h1" size="sm">
        Choose Token To Send
      </Heading>

      {/* This is an input field for the token ID. */}
      <Input
