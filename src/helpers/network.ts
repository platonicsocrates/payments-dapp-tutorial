// Importing the StellarWalletsKit module from the "stellar-wallets-kit" package
import { StellarWalletsKit } from "stellar-wallets-kit";

// Defining the NetworkDetails interface which describes the details of a network
export interface NetworkDetails {
  network: string; // The name of the network
  networkUrl: string; // The URL of the network
  networkPassphrase: string; // The passphrase of the network
