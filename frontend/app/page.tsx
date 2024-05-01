"use client";

import { useState } from "react";
import Image from "next/image";
import AccessControlJSON from "../abis/AccessControl.json";
import "dotenv/config";
import { ethers } from "ethers";
import type { NextPage } from "next";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: NextPage = () => {
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);
  const [isLoadingCheckin, setIsLoadingCheckin] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message

  async function handleConnect() {
    try {
      setIsLoadingWallet(true);

      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log("Connected to wallet:", address);

        setWalletConnected(true);
      } else {
        throw new Error("Metamask not detected. Please install Metamask and try again.");
      }

      setIsLoadingWallet(false);
    } catch (error) {
      console.error("An error occurred during the wallet connection process: ", error);
      setIsLoadingWallet(false);
    }
  }

  const handleRegisterClick = async () => {
    try {
      setIsLoadingRegister(true);

      if (!walletConnected) {
        console.error("Wallet is not connected.");
        setIsLoadingRegister(false);
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contractABI = AccessControlJSON.abi;
      const contractAddress = "0xAbC4140a1bAC0020BEfF9a917a18af50804Ef1Dc";
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const transaction = await contract.assignUserRole();
      await transaction.wait();

      console.log("User registered successfully.");

      setIsRegistered(true);
      setIsLoadingRegister(false);
    } catch (error) {
      console.error("An error occurred during the registration process: ", error);
      setIsLoadingRegister(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      setIsLoadingCheckin(true);

      if (!walletConnected) {
        console.error("Wallet is not connected.");
        setIsLoadingCheckin(false);
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contractABI = AccessControlJSON.abi;
      const contractAddress = "0xAbC4140a1bAC0020BEfF9a917a18af50804Ef1Dc";
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const transaction = await contract.checkIn();
      await transaction.wait();

      console.log("User checked in successfully.");

      setIsCheckedIn(true);
      setIsLoadingCheckin(false);
    } catch (error: any) {
      console.error("An error occurred during the check-in process: ", error);
      setIsLoadingCheckin(false);

      if (error.data && error.data.message && error.data.message.includes("You must wait 6 hours")) {
        // Update state to display the error message in the UI
        setErrorMessage("You can only check in once every 6 hours.");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-base-200">
      <div className="grid place-items-center mx-2 sm:my-auto">
        <div className="p-4 flex flex-col justify-center rounded-xl border border-blue-700 bg-base-100 mb-5">
          <div className="flex flex-row items-stretch">
            <div className="flex flex-col items-start mt-0">
              <h1 className="text-6xl sm:text-7xl md:text-8xl px-6 font-bold text-gray-900">
                <div className="flex flex-col space-y-1 mt-0">
                  <div>
                    <span className="text-5xl text-[#ef875f]">{`Let's`}</span>
                    <span className="text-5xl text-[#62a4a6] ml-4">Forkin</span>
                  </div>
                  <span className="text-5xl text-[#e2b53e]">Dance!</span>
                </div>
              </h1>
              <p>
                <span className="px-6 text-xl text-gray-500">
                  1) First, register on our platform using your Metamask ⬇️
                </span>
                <br />
                <span className="px-6 text-xl text-yellow-500">⚠️ This action requires that you have faucets</span>
                <br />
                <span className="pl-6 text-xl text-yellow-500">Get faucets on MAC LFD page: </span>
                <a
                  href="https://lfd.tanssi.network/mac?back=y"
                  target="_blank"
                  rel="noreferrer"
                  className=" text-xl text-yellow-500 underline"
                >
                  {" "}
                  here
                </a>
              </p>
              {!walletConnected ? (
                <div className="flex gap-3 px-6 pt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center px-6 py-2.5 shadow hover:opacity-80 transition ease-in-out duration-150 bg-primary text-white rounded-xl"
                    onClick={handleConnect}
                    disabled={isLoadingWallet}
                  >
                    {isLoadingWallet ? "Connecting..." : "Connect Wallet"}
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 px-6 pt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center px-6 py-2.5 shadow opacity-50 cursor-not-allowed transition ease-in-out duration-150 bg-blue-800 text-white rounded-xl"
                    disabled
                  >
                    Wallet connected
                  </button>
                </div>
              )}
              <div className="flex gap-3 px-6 pt-4">
                <button
                  type="button"
                  className="inline-flex justify-center items-center px-6 py-2.5 shadow hover:opacity-80 transition ease-in-out duration-150 bg-primary text-white rounded-xl"
                  onClick={isCheckedIn ? undefined : isLoadingRegister ? undefined : handleRegisterClick}
                  disabled={isRegistered} // Disable button if user is already registered
                  style={{ cursor: isRegistered ? "not-allowed" : "pointer" }} // Change cursor style
                >
                  {isLoadingRegister ? "Loading..." : isRegistered ? "Already Registered" : "Register"}
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/hero-logo.png"
                alt="LFD Logo"
                width={384}
                height={384}
                sizes="(min-width: 1024px) 384px, (min-width: 768px) 320px, (min-width: 640px) 288px, 256px"
                className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
              />
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col justify-center rounded-xl border border-blue-700 bg-base-100 mb-5 min-w-[980px]">
          <div className="flex flex-row items-stretch">
            <div className="flex flex-col items-start mt-0">
              <h1 className="text-6xl sm:text-7xl md:text-8xl px-6 font-bold text-gray-900">
                <div className="flex flex-col space-y-1 mt-0">
                  <div>
                    <span className="text-5xl text-[#ef875f]">Check-in</span>
                    <span className="text-5xl text-[#62a4a6] ml-4">now!</span>
                  </div>
                </div>
              </h1>
              <p>
                <span className="px-6 text-xl text-gray-500">Now you can check in. Remember that check-in can be</span>
                <br />
                <span className="px-6 text-xl text-gray-500">done every 6 hours.</span>
              </p>
              {errorMessage && ( // Render error message if present
                <div className="text-red-500 px-6 pt-4">{errorMessage}</div>
              )}
              <div className="flex gap-3 px-6 pt-4">
                <button
                  type="button"
                  className="inline-flex justify-center items-center px-6 py-2.5 shadow hover:opacity-80 transition ease-in-out duration-150 bg-primary text-white rounded-xl"
                  onClick={handleCheckIn}
                  disabled={isLoadingCheckin || isCheckedIn} // Disable button if user is already checked in
                  style={{ cursor: isCheckedIn ? "not-allowed" : "pointer" }} // Change cursor style
                >
                  {isLoadingCheckin ? "Checking In..." : isCheckedIn ? "Checked In" : "Check In"}
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/favicon.png"
                alt="Tanssi Logo"
                width={384}
                height={384}
                sizes="(min-width: 1024px) 384px, (min-width: 768px) 320px, (min-width: 640px) 288px, 256px"
                className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
