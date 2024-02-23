"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PayPerClickABI from "../../abis/PayPerClick_abi.json";
import type { NextPage } from "next";
import { Contract } from "starknet";
import { StarIcon } from "@heroicons/react/20/solid";
import { useUser } from "~~/context/globalState";

interface Campaign {
  _id: string;
  anunciante: string;
  criadorConteudo: string;
  CPM: string | number;
  status: string;
  linkParametrizado: string;
  descricao: string;
  concluido: boolean;
  token: string;
}

interface Creator {
  name: string;
  biography: string;
  occupation: string;
  targetAudience: string;
  stars: string | number;
  link: string;
  email: string;
  CPM: string | number;
  walletAddress: string;
}

const ProposalsMade: NextPage = () => {
  const { user } = useUser();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clickCounts, setClickCounts] = useState<{ [key: string]: number | "loading" | null }>({});

  const { provider } = useUser(); // Call useUser at the top level

  const [expandedProposals, setExpandedProposals] = useState<{ [key: string]: boolean }>({});
  const [creatorDetails, setCreatorDetails] = useState<{ [key: string]: Creator }>({});

  const handleMoreInfoClick = async (email: string) => {
    if (!expandedProposals[email]) {
      const creatorInfo = await checkCreator(email);
      if (creatorInfo) {
        setCreatorDetails({ ...creatorDetails, [email]: creatorInfo });
      }
    }
    setExpandedProposals({ ...expandedProposals, [email]: !expandedProposals[email] });
  };

  useEffect(() => {
    if (user && user.email) {
      getCampaignsByAdvertiser(user.email);
    } else {
      setLoading(false);
    }
  }, [user]);

  async function getCampaignsByAdvertiser(advertiserEmail: string) {
    try {
      const response = await fetch("https://mac-backend-six.vercel.app/announcements", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const allCampaigns = await response.json();

      const filteredCampaigns = allCampaigns
        .map((campaign: any) => ({
          ...campaign,
          CPM: campaign.CPM.$numberDecimal ? parseFloat(campaign.CPM.$numberDecimal) : campaign.CPM,
          // Add similar handling for any other Decimal128 fields
        }))
        .filter((campaign: Campaign) => campaign.anunciante === advertiserEmail);

      if (filteredCampaigns.length > 0) {
        setCampaigns(filteredCampaigns);
      } else {
        console.log("No campaigns found for that advertiser.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  }

  async function checkCreator(email: string): Promise<Creator | null> {
    try {
      const response = await fetch(`https://mac-backend-six.vercel.app/creators?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const creators = await response.json();
      const filteredCreators = creators
        .map((creator: any) => ({
          ...creator,
          stars: creator.stars.$numberDecimal ? parseFloat(creator.stars.$numberDecimal) : creator.stars,
          // Add similar handling for other Decimal128 fields if needed
        }))
        .filter((creator: Creator) => creator.email === email);

      if (filteredCreators.length > 0) {
        return filteredCreators[0];
      } else {
        console.log("No creator found with that email.");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  const handleCancelProposal = async (campaignId: string) => {
    const payPerClickAddress = "0x05da0fc073db1c6659cbb5c288157a4d33334b65386919bdd1c295a37f3bd308";
    //const PPCContract = new Contract(PayPerClickABI, payPerClickAddress, provider);

    try {
      const PPCContract = new Contract(PayPerClickABI, payPerClickAddress, provider);

      console.log("Provider:", provider); // Adiciona o console.log para o provider

      //Send a PATCH request to update the campaign
      const response = await fetch(`https://mac-backend-six.vercel.app/announcements/${campaignId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "finished",
          concluido: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update campaign");
      }

      // Update the campaign in local state
      setCampaigns(
        campaigns.map(campaign => {
          if (campaign._id === campaignId) {
            return { ...campaign, status: "finished", concluido: true };
          }
          return campaign;
        }),
      );

      // const creator = await checkCreator(campaignCriadorConteudo);
      // const creatorWalletAddress = creator?.walletAddress;

      // const PPCContract = new Contract(PayPerClickABI, payPerClickAddress, provider);

      await PPCContract.endPartnership(
        "0x0386d2a70fb9a5c816eea4eec900a6f1aa56a8ea1246edd1e99565a4d2dc407e",
        "0x0684e73232a2a3c66f8678ff9450c8d8cf1fe17bf73b45a8db21a5a2eff9e51a",
        1,
      );
    } catch (error) {
      console.error("Error updating campaign:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const getLinkClicks = async (linkParametrizado: string) => {
    try {
      // Parse the URL and get the pathname
      const url = new URL(linkParametrizado);
      const reference = url.pathname; // Gets the part after the domain, e.g., "/reference"

      // Check if the reference is valid
      if (!reference.startsWith("/")) {
        console.error("Invalid link format");
        return "Error"; // Or any other error handling
      }

      const response = await fetch(
        `https://mac-backend-six.vercel.app/clicks?reference=${encodeURIComponent(reference)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      const count = data.length;
      return count;
    } catch (error) {
      console.error("Error:", error);
      return "Error";
    }
  };

  const handleLinkClicks = async (campaignId: string, linkParametrizado: string) => {
    // Indicate loading state
    setClickCounts(prevCounts => ({ ...prevCounts, [campaignId]: "loading" }));

    const clicks = await getLinkClicks(linkParametrizado);
    setClickCounts(prevCounts => ({ ...prevCounts, [campaignId]: clicks }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "border-green-400";
      case "pending":
        return "border-yellow-400";
      case "refused":
        return "border-red-400";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex flex-col px-5">
          <h1 className="text-center mb-10">
            <span className="block text-4xl font-semibold mb-2">Your Proposal Overview</span>
            <span className="block text-lg">Monitor the status and responses to your proposals</span>
          </h1>
        </div>

        <div className="bg-base-300 w-full flex flex-col justify-center items-center text-center py-12">
          {loading ? (
            <p>Loading campaigns...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            campaigns
              .slice()
              .reverse()
              .map((campaign, index) => (
                <div
                  key={index}
                  className="bg-base-100 py-6 px-6 mx-6 my-2 items-center flex flex-col rounded-xl shadow-lg transition-transform duration-300 w-full max-w-4xl"
                >
                  <div className="grid md:grid-cols-2 gap-2 w-full">
                    <div className="flex flex-col items-center md:items-start gap-1 break-words w-full">
                      <div className="font-bold text-2xl text-left">{campaign.criadorConteudo}</div>

                      <div className="text-left items-center md:items-start">
                        <button
                          className="text-blue-500 hover:text-blue-800"
                          onClick={() => handleMoreInfoClick(campaign.criadorConteudo)}
                        >
                          {expandedProposals[campaign.criadorConteudo] ? "Less Info" : "More Info"}
                        </button>
                        {expandedProposals[campaign.criadorConteudo] && creatorDetails[campaign.criadorConteudo] && (
                          <div className="mt-2">
                            {" "}
                            {/* Adjust margin-top as needed for less gap */}
                            {/* Display creator information */}
                            <p className="font-bold my-1">
                              Name: <span className="font-normal">{creatorDetails[campaign.criadorConteudo].name}</span>
                            </p>
                            <p className="font-bold my-1">
                              Channel:{" "}
                              <span className="font-normal">
                                <Link
                                  href={creatorDetails[campaign.criadorConteudo].link}
                                  className="text-blue-500 hover:text-blue-800"
                                >
                                  {creatorDetails[campaign.criadorConteudo].occupation}
                                </Link>
                              </span>
                            </p>
                            <p className="font-bold my-1">
                              Target Audience:{" "}
                              <span className="font-normal">
                                {creatorDetails[campaign.criadorConteudo].targetAudience}
                              </span>
                            </p>
                            <p className="flex flex-row items-center gap-2 font-bold my-1">
                              Stars: <StarIcon className="w-4 h-4" />
                              <span className="font-normal">
                                {creatorDetails[campaign.criadorConteudo].stars} / 5.0
                              </span>
                            </p>
                            <p className="font-bold my-1">
                              Email:{" "}
                              <span className="font-normal">{creatorDetails[campaign.criadorConteudo].email}</span>
                            </p>
                            <p className="font-bold my-1">
                              Description:{" "}
                              <span className="font-normal">{creatorDetails[campaign.criadorConteudo].biography}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col items-center md:items-end gap-3">
                      {/* Campaign Details */}
                      <div className="text-md font-semibold bg-base-300 py-1 px-3 rounded-sm">
                        {campaign.CPM} {campaign.token} / 1,000 clicks
                      </div>

                      <div className="text-md font-normal mt-1">
                        {clickCounts[campaign._id] === "loading" ? (
                          <span>Loading...</span>
                        ) : typeof clickCounts[campaign._id] === "number" ? (
                          <>
                            <span className="font-bold">{clickCounts[campaign._id]}</span>
                            <span className="font-normal"> clicks so far</span>
                          </>
                        ) : (
                          <button
                            className="text-blue-500 hover:text-blue-800"
                            onClick={() => handleLinkClicks(campaign._id, campaign.linkParametrizado)}
                          >
                            Show clicks so far
                          </button>
                        )}
                      </div>

                      {/* Status */}
                      <div className="mt-1">
                        Status:{" "}
                        <span
                          className={`border bg-base-100 py-1 px-2 rounded-sm font-semibold ${getStatusColor(
                            campaign.status,
                          )}`}
                        >
                          {campaign.status}
                        </span>
                      </div>

                      {/* Concluded */}
                      <div className="text-md">{campaign.concluido ? "Concluded" : "Not concluded"}</div>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-5 rounded shadow-md">
                        Notify again
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-sm text-white font-semibold py-1 px-3 rounded shadow-md"
                        onClick={() => handleCancelProposal(campaign._id)}
                      >
                        Cancel proposal
                      </button>
                    </div>
                  </div>

                  <div className="w-full items-start flex flex-col">
                    {/* Parametric Link */}
                    <div className="text-md font-bold">
                      Parametric Link:{" "}
                      <Link
                        href={campaign.linkParametrizado}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-800"
                      >
                        <span className="font-normal"> {campaign.linkParametrizado} </span>
                      </Link>
                    </div>
                    {/* Campaign Description */}
                    <div className="bg-base-300 p-4 text-left justify-left rounded-md w-full mt-4">
                      {campaign.descricao}
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProposalsMade;
