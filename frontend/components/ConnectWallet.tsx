import React, { useEffect, useState } from "react";
import { connect } from "get-starknet";
import { useUser } from "~~/context/globalState";

// Adjust the import path

export const ConnectWallet = () => {
  const { provider, setProvider } = useUser(); // Use setProvider from UserContext
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (address) {
      console.log("Address:", address);
    }
  }, [address]);

  // useEffect para o provider
  useEffect(() => {
    if (provider) {
      console.log("Provider:", provider);
    }
  }, [provider]);

  const connectWallet = async () => {
    try {
      // Allows a user to pick a wallet on button click
      const starknet = await connect();

      // Connect to the wallet
      if (starknet) {
        await starknet.enable();

        // Set account provider to the global state
        setProvider(starknet.account);

        // Set user address to the local state
        if (starknet.selectedAddress) {
          setAddress(starknet.selectedAddress);
        }

        // Set connection status
        setIsConnected(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <button className="btn" onClick={connectWallet}>
        {isConnected ? `Connected: ${address}` : "Connect Wallet"}
      </button>
    </div>
  );
};
