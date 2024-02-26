"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

    const walletKey = process.env.NEXT_PUBLIC_ADMIN_KEY; // Nunca exponha sua chave privada em código de produção

    const provider = new ethers.providers.JsonRpcProvider(
      "https://avalanche-fuji.infura.io/v3/84ad611c167b499ead05e7794fbd84a8",
    );
    const wallet = new ethers.Wallet(walletKey!, provider);

    const MacMainABI = MacMainJSON.abi;
    const MacMainAddress = process.env.NEXT_PUBLIC_MAC_MAIN_ADDRESS;

    const MacMainContract = new ethers.Contract(MacMainAddress!, MacMainABI, wallet);
    const transaction = await MacMainContract.grantCreatorRole(walletAddress);

    await transaction.wait();

    try {
      const response = await fetch("https://backend-mac.vercel.app/creators", {
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
      const response = await fetch("https://backend-mac.vercel.app/creators", {
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
        console.log("New Creator:", newCreator);
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

    const walletKey = process.env.NEXT_PUBLIC_ADMIN_KEY; // Nunca exponha sua chave privada em código de produção

    const provider = new ethers.providers.JsonRpcProvider(
      "https://avalanche-fuji.infura.io/v3/84ad611c167b499ead05e7794fbd84a8",
    );
    const wallet = new ethers.Wallet(walletKey!, provider);

    const MacMainABI = MacMainJSON.abi;
    const MacMainAddress = process.env.NEXT_PUBLIC_MAC_MAIN_ADDRESS;

    const MacMainContract = new ethers.Contract(MacMainAddress!, MacMainABI, wallet);
    const transaction = await MacMainContract.grantAdvertiserRole(walletAddress);

    await transaction.wait();

    try {
      const response = await fetch("https://backend-mac.vercel.app/announcers", {
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
      const response = await fetch("https://backend-mac.vercel.app/announcers", {
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
        console.log("New Advertiser:", newAdvertiser);

        return newAdvertiser;
      }
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  const handleConnect = async () => {
    try {
      let foundUser;

      const userInfo = connectKit.particle.auth.getUserInfo();
      if (userInfo) {
        console.log(userInfo);
      }

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
        console.log("User id:", foundUser._id);
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
    } catch (error) {
      console.error("An error occurred during the login process: ", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-base-200">
      <div className="grid place-items-center mx-2 my-5 sm:my-auto">
        <div className="flex flex-row justify-around font-semibold text-lg w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 2xl:w-3/12 bg-base-100 border border-blue-700 rounded-xl shadow-lg mb-10">
          <div
            className={`flex flex-col items-center justify-center flex-grow rounded-l-xl border-r border-blue-700 p-12 sm:p-6 ${
              selectedType === "advertiser" ? "bg-base-300" : ""
            }`}
            onClick={() => setSelectedType("advertiser")}
          >
            <BuildingStorefrontIcon className="w-4 h-4" />
            <button>I am an advertiser</button>
          </div>

          <div
            className={`flex flex-col items-center justify-center flex-grow rounded-r-xl p-12 sm:p-6 ${
              selectedType === "creator" ? "bg-base-300" : ""
            }`}
            onClick={() => setSelectedType("creator")}
          >
            <UserIcon className="w-4 h-4" />
            <button>I am a creator</button>
          </div>
        </div>

        <div className=" flex flex-col border border-blue-700 w-11/12 p-6 sm:w-8/12 md:w-6/12 lg:w-4/12 2xl:w-3/12 sm:px-10 sm:py-6 bg-base-100 rounded-xl shadow-lg items-center">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl mb-6">
            Login {selectedType === "advertiser" ? "as Advertiser" : selectedType === "creator" ? "as Creator" : ""}
          </h2>
          <ConnectButton />
          <button
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleConnect}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
