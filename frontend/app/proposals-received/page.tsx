"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MacMainJSON from "../../abis/MacMain.json";
import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { useParticleProvider } from "@particle-network/connect-react-ui";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { StarIcon } from "@heroicons/react/24/solid";
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

interface Advertiser {
  razaoSocial: string;
  quantidadeAnunciosFeitos: number;
  stars: string | number;
  link: string;
  email: string;
  walletAddress: string;
}

const ProposalsReceived: NextPage = () => {
  const { user } = useUser();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clickCounts, setClickCounts] = useState<{ [key: string]: number | "loading" | null }>({});
  const ParticleProvider = useParticleProvider();

  const [expandedProposals, setExpandedProposals] = useState<{ [key: string]: boolean }>({});
  const [advertiserDetails, setAdvertiserDetails] = useState<{ [key: string]: Advertiser }>({});

  async function getCampaignsByCreator(creatorEmail: string) {
    try {
      const response = await fetch("https://backend-mac.vercel.app/announcements", {
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
        .filter((campaign: Campaign) => campaign.criadorConteudo === creatorEmail);

      if (filteredCampaigns.length > 0) {
        setCampaigns(filteredCampaigns);
      } else {
        console.log("No campaigns found for that creator.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  }

  async function checkAdvertiser(email: string): Promise<Advertiser | null> {
    try {
      const response = await fetch(`https://backend-mac.vercel.app/announcers?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const announcers = await response.json();
      const filteredAnnouncers = announcers
        .map((announcer: any) => ({
          ...announcer,
          stars: announcer.stars.$numberDecimal ? parseFloat(announcer.stars.$numberDecimal) : announcer.stars,
          // Add similar handling for other Decimal128 fields if needed
        }))
        .filter((announcer: Advertiser) => announcer.email === email);

      if (filteredAnnouncers.length > 0) {
        return filteredAnnouncers[0];
      } else {
        console.log("No announcer found with that email.");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  useEffect(() => {
    if (user && user.email) {
      getCampaignsByCreator(user.email);
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleMoreInfoClick = async (email: string) => {
    if (!expandedProposals[email]) {
      const advertiserInfo = await checkAdvertiser(email);
      if (advertiserInfo) {
        setAdvertiserDetails({ ...advertiserDetails, [email]: advertiserInfo });
      }
    }
    setExpandedProposals({ ...expandedProposals, [email]: !expandedProposals[email] });
  };

  const handleAcceptProposal = async (campaignId: string) => {
    const customProvider = new ethers.providers.Web3Provider(ParticleProvider as ExternalProvider | JsonRpcFetchFunc);

    const signer = customProvider.getSigner();

    const MacMainABI = MacMainJSON.abi;
    const MacMainAddress = "0x07c420C56BaeFc7cD6c4828d58d68e6ba23B1d28";

    const MacMainContract = new ethers.Contract(MacMainAddress, MacMainABI, signer);

    const transaction = await MacMainContract.acceptAdvertisment(3); // TODO: Index logic here

    await transaction.wait();

    try {
      // Send a PATCH request to update the campaign
      const response = await fetch(`https://backend-mac.vercel.app/announcements/${campaignId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "accepted",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update campaign");
      }

      // Update the campaign in local state
      setCampaigns(
        campaigns.map(campaign => {
          if (campaign._id === campaignId) {
            return { ...campaign, status: "accepted" };
          }
          return campaign;
        }),
      );
    } catch (error) {
      console.error("Error updating campaign:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const handleDenyProposal = async (campaignId: string) => {
    if (ParticleProvider) {
      const customProvider = new ethers.providers.Web3Provider(ParticleProvider as ExternalProvider | JsonRpcFetchFunc);

      const signer = customProvider.getSigner();

      const MacMainABI = MacMainJSON.abi;
      const MacMainAddress = "0x07c420C56BaeFc7cD6c4828d58d68e6ba23B1d28";

      const MacMainContract = new ethers.Contract(MacMainAddress, MacMainABI, signer);

      const transaction = await MacMainContract.rejectAdvertisment(4); // TODO: Index logic here

      await transaction.wait();
    }

    try {
      // Send a PATCH request to update the campaign
      const response = await fetch(`https://backend-mac.vercel.app/announcements/${campaignId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "refused",
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
            return { ...campaign, status: "refused", concluido: true };
          }
          return campaign;
        }),
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

      const response = await fetch(`https://backend-mac.vercel.app/clicks?reference=${encodeURIComponent(reference)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

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

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "border-green-400";
      case "pending":
        return "border-yellow-400";
      case "refused":
        return "border-red-400";
      default:
        return "border-gray-200";
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex flex-col px-5">
          <h1 className="text-center mb-10">
            <span className="block text-4xl font-semibold mb-2">Advertisers Proposals to You</span>
            <span className="block text-lg">Check out opportunities and close great deals with advertisers</span>
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
                  onMouseOver={e => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <div className="grid md:grid-cols-2 gap-2 w-full">
                    <div className="flex flex-col items-center md:items-start gap-1 break-words">
                      <div className="font-bold text-2xl text-left">{campaign.anunciante}</div>

                      <div className="text-left items-center md:items-start">
                        <button
                          className="text-blue-500 hover:text-blue-800"
                          onClick={() => handleMoreInfoClick(campaign.anunciante)}
                        >
                          {expandedProposals[campaign.anunciante] ? "Less Info" : "More Info"}
                        </button>
                        {expandedProposals[campaign.anunciante] && advertiserDetails[campaign.anunciante] && (
                          <div className="mt-2">
                            {/* Adjust margin-top as needed for less gap */}
                            <p className="font-bold my-1">
                              Name:{" "}
                              <span className="font-normal">{advertiserDetails[campaign.anunciante].razaoSocial}</span>
                            </p>
                            <p className="font-bold my-1">
                              Email: <span className="font-normal">{advertiserDetails[campaign.anunciante].email}</span>
                            </p>
                            <p className="font-bold my-1">
                              Company Link:{" "}
                              <span className="font-normal">
                                <Link
                                  href={advertiserDetails[campaign.anunciante].link}
                                  className="text-blue-500 hover:text-blue-800"
                                >
                                  {advertiserDetails[campaign.anunciante].link}
                                </Link>
                              </span>
                            </p>
                            <p className="font-bold my-1">
                              Deals Made:{" "}
                              <span className="font-normal">
                                {advertiserDetails[campaign.anunciante].quantidadeAnunciosFeitos}
                              </span>
                            </p>
                            <p className="flex flex-row items-center gap-2 font-bold my-1">
                              Stars: <StarIcon className="w-4 h-4" />
                              <span className="font-normal">{advertiserDetails[campaign.anunciante].stars} / 5.0</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3 mt-4 md:mt-0">
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

                      <div>
                        Status:{" "}
                        <span
                          className={`border py-1 px-2 rounded-sm font-semibold ${getStatusBgColor(campaign.status)}`}
                        >
                          {campaign.status}
                        </span>
                      </div>

                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded shadow-md"
                        onClick={() => handleAcceptProposal(campaign._id)}
                      >
                        Accept proposal
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded shadow-md"
                        onClick={() => handleDenyProposal(campaign._id)}
                      >
                        Deny proposal
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

export default ProposalsReceived;
