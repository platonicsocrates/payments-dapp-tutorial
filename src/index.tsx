// Importing necessary dependencies
import * as React from "react";
import ReactDOM from "react-dom/client";

// Importing the SendPayment component from the "./components/send-payment" file
import { SendPayment } from "./components/send-payment";

// Importing the CSS styles from the "@stellar/design-system/build/styles.min.css" file
import "@stellar/design-system/build/styles.min.css";

// Importing custom styles from the "./index.scss" file
import "./index.scss";

// Creating a root element to render the SendPayment component
const root = ReactDOM.createRoot(document.getElementById("root")!);

// Rendering the SendPayment component inside the root element
root.render(<SendPayment />);
