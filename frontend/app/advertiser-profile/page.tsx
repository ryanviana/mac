"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { CheckIcon, PencilIcon, StarIcon } from "@heroicons/react/24/solid";
import { useUser } from "~~/context/globalState";

const AdvertiserProfile: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const { user } = useUser(); // Destructure user from the global state
  const [editable, setEditable] = useState({
    razaoSocial: "",
    quantidadeAnunciosFeitos: 0,
    stars: 0,
    link: "",
    email: "",
    walletAddress: "",
  });

  // Handler to update local state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setEditable({ ...editable, [field]: e.target.value });
  };

  // Já testei e está funcionando perfeitamente
  async function checkAdvertiserById(advertiserId: string) {
    try {
      const response = await fetch(`https://backend-mac.vercel.app/announcers/${advertiserId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch advertiser data");
      }

      const advertiser = await response.json();

      if (advertiser) {
        console.log("Advertiser found:", advertiser);
        return advertiser;
      } else {
        console.log("No advertiser found with that ID.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function updateAdvertiser(id: string, updateData: any) {
    try {
      // If the advertiser is found, send a PATCH request to update it
      const updateResponse = await fetch(`https://backend-mac.vercel.app/announcers/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const updateDataResponse = await updateResponse.json();
      console.log("Update Response:", updateDataResponse);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //console.log("Rendering AdvertiserProfile", user); // Debug log

  useEffect(() => {
    const fetchAdvertiserData = async () => {
      console.log("User in AdvertiserProfile:", user); // Debug log

      if (!user || !user.id) {
        console.log("User ID not available");
        setError("User ID not available");
        return;
      }

      setIsLoading(true);

      try {
        const advertiserData = await checkAdvertiserById(user.id);
        if (advertiserData) {
          console.log("Advertiser data:", advertiserData);

          // Extract stars value
          const starsValue =
            advertiserData.stars && advertiserData.stars.$numberDecimal
              ? parseFloat(advertiserData.stars.$numberDecimal)
              : advertiserData.stars;

          // Update the editable state
          setEditable({
            ...advertiserData,
            stars: starsValue,
          });
        } else {
          setError("Advertiser not found");
        }
      } catch (error) {
        console.error("Error fetching advertiser data:", error);
        setError("Error fetching advertiser data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvertiserData();
  }, [user]);

  const saveProfile = async () => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      try {
        console.log("Profile successfully saved");
        updateAdvertiser(user.id, editable);
        setIsEditable(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex flex-col px-5">
          <h1 className="text-center mb-10">
            <span className="block text-4xl font-semibold mb-2">Your Advertiser Profile</span>
            <span className="block text-lg">Showcase your brand to attract the best content creators</span>
          </h1>
        </div>

        <div className="bg-base-300 w-full flex justify-center items-center pt-16 pb-20">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div
              className="bg-base-100 py-10 px-10 text-center items-center rounded-xl mx-auto shadow-lg transition-transform duration-300 hover:scale-105"
              style={{ width: "400px" }}
            >
              <div className="flex flex-grow justify-end">
                {isEditable ? (
                  <CheckIcon className="h-5 w-5 ml-2 cursor-pointer" onClick={() => setIsEditable(false)} />
                ) : (
                  <PencilIcon className="h-5 w-5 ml-2 cursor-pointer" onClick={() => setIsEditable(true)} />
                )}
              </div>

              <div className="flex items-center text-center py-1">
                {isEditable ? (
                  <input
                    className="font-bold flex-grow text-3xl mb-0 text-center w-full py-2"
                    placeholder="Insert your company name"
                    value={editable.razaoSocial}
                    onChange={e => handleChange(e, "razaoSocial")}
                  />
                ) : (
                  <div className="font-bold text-3xl mb-0 text-center w-full py-2">
                    {" "}
                    {editable.razaoSocial || "Insert your company name"}
                  </div>
                )}
              </div>

              <div className="flex items-center text-center py-1">
                {isEditable ? (
                  <input
                    className="text-center text-lg w-full break-words"
                    placeholder="Insert your company email"
                    value={editable.email}
                    onChange={e => handleChange(e, "email")}
                  />
                ) : (
                  <div className="text-lg w-full break-words"> {editable.email || "Insert your company email"}</div>
                )}
              </div>

              <div className="flex items-center text-center py-1">
                {isEditable ? (
                  <input
                    className="text-blue-500 hover:text-blue-800 text-center text-lg w-full break-words"
                    placeholder="Insert your company link"
                    value={editable.link}
                    onChange={e => handleChange(e, "link")}
                  />
                ) : (
                  <div className="text-blue-500 hover:text-blue-800 text-lg w-full break-words">
                    {" "}
                    {editable.link || "Insert your company link"}
                  </div>
                )}
              </div>

              <div className="flex flex-row justify-center gap-2 my-1 w-full py-1">
                <StarIcon className="h-5 w-5" />
                <span className="text-md text-center">{editable.stars} / 5.0</span>
              </div>

              <div className="flex items-center py-1">
                <div className="text-md text-center p-2 w-full">
                  Total Ads Made: {editable.quantidadeAnunciosFeitos}
                </div>
              </div>

              <div className="flex items-center text-center py-1">
                {isEditable ? (
                  <input
                    className="text-center text-md w-full break-words"
                    placeholder="Insert your company wallet address"
                    value={editable.walletAddress}
                    onChange={e => handleChange(e, "walletAddress")}
                  />
                ) : (
                  <div className="text-md w-full break-words">
                    Wallet Address: {editable.walletAddress || "Insert your company wallet address"}
                  </div>
                )}
              </div>

              <button
                className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-10 shadow-md rounded-full"
                onClick={saveProfile}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdvertiserProfile;
