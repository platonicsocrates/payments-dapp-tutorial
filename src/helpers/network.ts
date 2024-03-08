// Importing the StellarWalletsKit module from the "stellar-wallets-kit" package
import { StellarWalletsKit } from "stellar-wallets-kit";

// Defining the NetworkDetails interface which describes the details of a network
export interface NetworkDetails {
  network: string; // The name of the network
  networkUrl: string; // The URL of the network
  networkPassphrase: string; // The passphrase of the network
}

// Details specific to the Futurenet network
export const FUTURENET_DETAILS = {
  network: "FUTURENET", // The name of the Futurenet network
  networkUrl: "https://horizon-futurenet.stellar.org", // The URL of the Futurenet network
  networkPassphrase: "Test SDF Future Network ; October 2022", // The passphrase of the Futurenet network
};

// Function to sign a transaction
export const signTx = async (
  xdr: string, // The transaction XDR
  publicKey: string, // The public key of the signer
  kit: StellarWalletsKit, // The StellarWalletsKit instance
) => {
  // Signing the transaction using the StellarWalletsKit's sign method
  const { signedXDR } = await kit.sign({
