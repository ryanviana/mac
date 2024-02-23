"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { CheckIcon, PencilIcon, StarIcon } from "@heroicons/react/24/solid";
import { useUser } from "~~/context/globalState";

const CreatorProfile: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const { user } = useUser(); // Destructure user from the global state
  const [editable, setEditable] = useState({
    name: "",
    occupation: "",
    link: "",
    targetAudience: "",
    CPM: 0,
    biography: "",
    stars: 0,
    email: "",
    walletAddress: "",
    paymentToken: "",
  });

  async function checkCreatorById(creatorId: string) {
    try {
      const response = await fetch(`https://mac-backend-six.vercel.app/creators/${creatorId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch creator data");
      }

      const creator = await response.json();
      if (creator) {
        console.log("Creator found:", creator);
        return creator;
      } else {
        console.log("No creator found with that ID.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function updateCreator(id: string, updateData: any) {
    try {
      const updateResponse = await fetch(`https://mac-backend-six.vercel.app/creators/${id}`, {
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

  useEffect(() => {
    const fetchCreatorData = async () => {
      if (!user || !user.id) {
        setError("User ID not available");
        return;
      }

      setIsLoading(true);
      try {
        const creatorData = await checkCreatorById(user.id);
        if (creatorData) {
          // Parse the stars value
          const starsValue =
            creatorData.stars && creatorData.stars.$numberDecimal
              ? parseFloat(creatorData.stars.$numberDecimal)
              : parseFloat(creatorData.stars) || 0;

          // Parse the CPM value
          const CPMValue =
            creatorData.CPM && creatorData.CPM.$numberDecimal
              ? parseFloat(creatorData.CPM.$numberDecimal)
              : parseFloat(creatorData.CPM) || 0;

          setEditable({
            ...creatorData,
            stars: starsValue,
            CPM: CPMValue,
          });
        } else {
          setError("Creator not found");
        }
      } catch (error) {
        setError("Error fetching creator data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreatorData();
  }, [user]);

  const saveProfile = async () => {
    try {
      console.log("Profile successfully saved");
      await updateCreator(user.id, editable);
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handler to update local state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setEditable({ ...editable, [field]: e.target.value });
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex flex-col px-5">
          <h1 className="text-center mb-10">
            <span className="block text-4xl font-semibold mb-2">Your Creator profile</span>
            <span className="block text-lg">Create an amazing profile to impress Advertisers</span>
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

              <div className="flex items-center py-1">
                {isEditable ? (
                  <input
                    className="font-bold text-3xl mb-0 text-center w-full py-2"
                    placeholder="Insert your name"
                    value={editable.name}
                    onChange={e => handleChange(e, "name")}
                  />
                ) : (
                  <div className="font-bold text-3xl mb-0 text-center w-full py-2">
                    {editable.name || "Insert your name"}
                  </div>
                )}
              </div>

              <div className="flex items-center text-center py-1">
                {isEditable ? (
                  <input
                    className="text-center text-lg w-full break-words"
                    placeholder="Insert your e-mail"
                    value={editable.email}
                    onChange={e => handleChange(e, "email")}
                  />
                ) : (
                  <div className="text-lg w-full break-words">{editable.email || "Insert your e-mail"}</div>
                )}
              </div>

              <div className="flex items-center text-center py-1 flex-grow px-4 min-w-0">
                {isEditable ? (
                  <input
                    className="flex text-lg w-full flex-grow text-center"
                    placeholder="Insert your channel name"
                    value={editable.occupation}
                    onChange={e => handleChange(e, "occupation")}
                  />
                ) : (
                  <div className="flex flex-grow text-lg w-full justify-center">
                    {editable.occupation || "Insert your channel name"}
                  </div>
                )}
              </div>

              <div className="flex items-center py-1">
                <div className="flex-grow px-4 min-w-0">
                  {isEditable ? (
                    <input
                      className="text-blue-500 hover:text-blue-800 text-lg w-full break-words"
                      placeholder="Insert your channel link"
                      value={editable.link}
                      onChange={e => handleChange(e, "link")}
                    />
                  ) : (
                    <div className="text-blue-500 hover:text-blue-800 text-lg w-full break-words">
                      {editable.link || "Insert your channel link"}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center py-1 flex-grow px-4 min-w-0">
                {isEditable ? (
                  <input
                    className="italic text-md text-center w-full"
                    placeholder="Insert your target audience"
                    value={editable.targetAudience}
                    onChange={e => handleChange(e, "targetAudience")}
                  />
                ) : (
                  <div className="italic text-md w-full">
                    {editable.targetAudience || "Insert your target audience"}
                  </div>
                )}
              </div>

              <div className="flex items-center py-1 flex-grow px-4 min-w-0">
                {isEditable ? (
                  <input
                    className="text-md text-center w-full"
                    placeholder="Insert token to receive payments (USDT, BTC, ETH)"
                    value={editable.paymentToken}
                    onChange={e => handleChange(e, "paymentToken")}
                  />
                ) : (
                  <div className="text-md w-full">
                    <span className="font-semibold">Payment token: </span>{" "}
                    {editable.paymentToken || "Insert token to receive payments (USDT, BTC, ETH)"}
                  </div>
                )}
              </div>

              <div className="flex items-center py-1 justify-between">
                <div className="flex items-center flex-grow justify-center">
                  <div className="flex items-center justify-center">
                    {isEditable ? (
                      <input
                        style={{ width: "40px" }} // Set the width as needed
                        placeholder="Insert the cost per mille clicks"
                        className="text-md text-center"
                        value={editable.CPM}
                        onChange={e => handleChange(e, "CPM")}
                      />
                    ) : (
                      <div className="text-md flex-grow text-center py-2 mr-2">
                        {editable.CPM || "Insert your name"}
                      </div>
                    )}
                    <span className="text-gray-500 text-md ml-0 whitespace-nowrap">USD per 1,000 clicks</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center py-1 flex-grow px-4 min-w-0">
                {isEditable ? (
                  <input
                    className="text-md text-center w-full"
                    placeholder="Insert your wallet address"
                    value={editable.walletAddress}
                    onChange={e => handleChange(e, "walletAddress")}
                  />
                ) : (
                  <div className="text-md w-full">
                    {" "}
                    <span className="font-semibold">Wallet Address: </span>{" "}
                    {editable.walletAddress || "Insert your wallet address"}
                  </div>
                )}
              </div>

              <div className="flex flex-row justify-center gap-2 my-2 w-full py-1">
                <StarIcon className="h-5 w-5" />
                <span className="text-md text-center">{editable.stars} / 5.0</span>
              </div>

              <div className="flex items-center py-1">
                {isEditable ? (
                  <textarea
                    className="text-md text-gray-500 text-center p-2 w-full"
                    placeholder="Insert a short biography about yourself"
                    value={editable.biography}
                    rows={3}
                    onChange={e => handleChange(e, "biography")}
                  />
                ) : (
                  <div className="text-md text-gray-500 text-center p-2 w-full">
                    {editable.biography || "Insert your name"}
                  </div>
                )}
              </div>

              <button
                className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-10 shadow-md rounded-full"
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

export default CreatorProfile;
