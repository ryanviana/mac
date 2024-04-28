"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AccessControlJSON from "../abis/AccessControl.json";
import MacMainJSON from "../abis/MacMain.json";
import { ConnectButton, useConnectKit } from "@particle-network/connect-react-ui";
import "@particle-network/connect-react-ui/dist/index.css";
import "dotenv/config";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { BuildingStorefrontIcon, UserIcon } from "@heroicons/react/24/solid";
import { useUser } from "~~/context/globalState";

const LoginPage: NextPage = () => {
  const [selectedType, setSelectedType] = useState("none");
  const [isNewProfile, setIsNewProfile] = useState(false);
  const { setUser } = useUser();
  const connectKit = useConnectKit();
  const [isLoading, setIsLoading] = useState(false);
  // const ParticleProvider = useParticleProvider();

  const router = useRouter();

  async function createNewCreator(email: string, walletAddress: string) {
    const body = JSON.stringify({
      name: "define",
      biography: "define",
      occupation: "define",
      targetAudience: "define",
      stars: 0,
      link: "define",
      email: email,
      CPM: 0,
      walletAddress: walletAddress,
      paymentToken: "define",
    });

    const walletKey = process.env.NEXT_PUBLIC_ADMIN_KEY;
    if (!walletKey) {
      console.error("ADMIN_KEY is not defined in environment variables.");
      return; // Or handle this scenario appropriately
    }

    const provider = new ethers.providers.JsonRpcProvider("https://97.rpc.thirdweb.com");
    const wallet = new ethers.Wallet(walletKey, provider);

    const AccessControlABI = AccessControlJSON.abi;

    const AccessControlAddress = process.env.NEXT_PUBLIC_ACCESS_CONTROL_ADDRESS;
    if (!AccessControlAddress) {
      console.error("AccessControlAddress is not defined in environment variables.");
      return; // Or handle this scenario appropriately
    }

    const AccessControlContract = new ethers.Contract(AccessControlAddress, AccessControlABI, wallet);
    const transaction = await AccessControlContract.assignCreatorRole(walletAddress);

    await transaction.wait();

    try {
      const response = await fetch("https://prisma-tech-mac-backend.vercel.app/creators", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      setIsNewProfile(true);

      const data = await response.json();
      console.log("Creator created:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function checkCreator(email: string, walletAddress: string) {
    try {
      const response = await fetch("https://prisma-tech-mac-backend.vercel.app/creators", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const creators = await response.json();
      const filteredCreators = creators.filter((creator: { email: string }) => creator.email === email);

      if (filteredCreators.length > 0) {
        console.log("Creator found:", filteredCreators[0]);
        return filteredCreators[0];
      } else {
        console.log("No creator found with that email.");
        const newCreator = createNewCreator(email, walletAddress);
        return newCreator;
      }
    } catch (error) {
      console.error("Error:", error);
      return []; // Return an empty array in case of an error
    }
  }

  async function createNewAdvertiser(email: string, walletAddress: string) {
    const body = JSON.stringify({
      razaoSocial: "define",
      quantidadeAnunciosFeitos: 0,
      stars: 0,
      link: "define",
      email: email,
      walletAddress: walletAddress,
    });

    const walletKey = process.env.NEXT_PUBLIC_ADMIN_KEY;
    if (!walletKey) {
      console.error("ADMIN_KEY is not defined in environment variables.");
      return; // Or handle this scenario appropriately
    }

    const provider = new ethers.providers.JsonRpcProvider("https://97.rpc.thirdweb.com");
    const wallet = new ethers.Wallet(walletKey, provider);

    const AccessControlABI = AccessControlJSON.abi;

    const AccessControlAddress = process.env.NEXT_PUBLIC_ACCESS_CONTROL_ADDRESS;
    if (!AccessControlAddress) {
      console.error("AccessControlAddress is not defined in environment variables.");
      return; // Or handle this scenario appropriately
    }

    const AccessControlContract = new ethers.Contract(AccessControlAddress, AccessControlABI, wallet);
    const transaction = await AccessControlContract.assignAdvertiserRole(walletAddress);

    await transaction.wait();

    try {
      const response = await fetch("https://prisma-tech-mac-backend.vercel.app/announcers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      setIsNewProfile(true);

      const data = await response.json();
      console.log("Advertiser created:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function checkAdvertiser(companyEmail: string, walletAddress: string) {
    try {
      const response = await fetch("https://prisma-tech-mac-backend.vercel.app/announcers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const advertisers = await response.json();
      const filteredAdvertisers = advertisers.filter(
        (advertiser: { email: string }) => advertiser.email === companyEmail,
      );

      if (filteredAdvertisers.length > 0) {
        console.log("Advertiser found:", filteredAdvertisers[0]);
        return filteredAdvertisers[0];
      } else {
        console.log("No advertiser found with that email.");
        const newAdvertiser = createNewAdvertiser(companyEmail, walletAddress);
        return newAdvertiser;
      }
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  const handleConnect = async () => {
    try {
      setIsLoading(true); // Set loading to true when connection starts

      let foundUser;

      const userInfo = connectKit.particle.auth.getUserInfo();

      const userEmail =
        userInfo?.google_email ||
        userInfo?.email ||
        userInfo?.facebook_email ||
        userInfo?.apple_email ||
        userInfo?.twitter_email ||
        userInfo?.github_email ||
        userInfo?.linkedin_email ||
        userInfo?.discord_email ||
        userInfo?.microsoft_email;

      const userAddress = userInfo?.wallets?.[0]?.public_address;

      if (selectedType === "advertiser" && userEmail && userAddress) {
        foundUser = await checkAdvertiser(userEmail, userAddress);
      } else if (selectedType === "creator" && userEmail && userAddress) {
        foundUser = await checkCreator(userEmail, userAddress);
      } else {
        throw new Error("Invalid user type");
      }

      if (foundUser) {
        setUser({ id: foundUser._id, type: selectedType, email: foundUser.email }); // Update global user state
      }
      // Proceed with login if user exists or a new user has been created
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, type: selectedType }),
      });
      if (!response.ok) {
        throw new Error("Login request failed");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);

      if (isNewProfile && selectedType === "advertiser") {
        router.push("/advertiser-profile");
        setIsNewProfile(false);
      } else if (isNewProfile && selectedType === "creator") {
        router.push("/creator-profile");
        setIsNewProfile(false);
      } else {
        router.push("/home");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("An error occurred during the login process: ", error);
      setIsLoading(false);
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
                    <span className="text-5xl text-[#ef875f]">Let's</span>
                    <span className="text-5xl text-[#62a4a6] ml-4">Forkin</span>
                  </div>
                  <span className="text-5xl text-[#e2b53e]">Dance!</span>
                </div>
              </h1>
              <p>
                <span className="px-6 text-xl text-gray-500">
                  First, register on our platform using your Metamask ⬇️
                </span>
              </p>
              <div className="flex gap-3 px-6 pt-4">
                <button
                  type="button"
                  className="inline-flex justify-center items-center px-6 py-2.5 shadow hover:opacity-80 transition ease-in-out duration-150 bg-primary text-white rounded-xl"
                >
                  Register
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
        <div className="p-4 flex flex-col justify-center rounded-xl border border-blue-700 bg-base-100 mb-5">
          <div className="flex flex-row items-stretch">
            <div className="flex flex-col items-start mt-0">
              <h1 className="text-6xl sm:text-7xl md:text-8xl px-6 font-bold text-gray-900">
                <div className="flex flex-col space-y-1 mt-0">
                  <div>
                    <span className="text-5xl text-[#ef875f]">Let's</span>
                    <span className="text-5xl text-[#62a4a6] ml-4">Forkin</span>
                  </div>
                  <span className="text-5xl text-[#e2b53e]">Dance!</span>
                </div>
              </h1>
              <p>
                <span className="px-6 text-xl text-gray-500">Now you can check in. Remember that check-in can be</span>
                <br />
                <span className="px-6 text-xl text-gray-500">done every 6 hours.</span>
              </p>
              <div className="flex gap-3 px-6 pt-4">
                <button
                  type="button"
                  className="inline-flex justify-center items-center px-6 py-2.5 shadow hover:opacity-80 transition ease-in-out duration-150 bg-primary text-white rounded-xl"
                >
                  Check in
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
      </div>
    </div>
  );
};

export default LoginPage;
