"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PayPerClickABI from "../../abis/PayPerClick_abi.json";
import type { NextPage } from "next";
import { Contract } from "starknet";
import { StarIcon } from "@heroicons/react/20/solid";
import { useUser } from "~~/context/globalState";

interface Creator {
  _id: string;
  name: string;
  biography: string;
  occupation: string;
  targetAudience: string;
  stars: { $numberDecimal: string };
  link: string;
  email: string;
  CPM: { $numberDecimal: string };
  walletAddress: string;
  paymentToken: string;
}

const Home: NextPage = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const { user } = useUser();
  const [visibleDropdown, setVisibleDropdown] = useState<number | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    description: "",
    cpm: "",
    totalDollars: "",
    link: "",
    parameter: "",
  });

  const { provider } = useUser(); // Call useUser at the top level

  async function createCampaign(
    descricao: string,
    token: string,
    CPM: number,
    anunciante: string,
    criadorConteudo: string,
    linkParametrizado: string,
    totalAmount: number,
    advertiserWalletAddress: string,
    creatorWalletAddress: string,
  ) {
    const body = JSON.stringify({
      descricao,
      token,
      CPM,
      anunciante,
      criadorConteudo,
      status: "pending", // Assuming this is always "pending" initially
      concluido: false, // Assuming this is always "false" initially
      linkParametrizado,
      starknetIndex: "-1", // Placeholder value
      totalAmount,
      advertiserWalletAddress,
      creatorWalletAddress,
    });

    console.log("Creating campaign with body:", body);
    console.log("Anunciante:", anunciante); // Check the user type (optional)

    try {
      const response = await fetch("https://mac-backend-six.vercel.app/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();
      console.log("Campaign created:", data);
      return data._id;
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  }

  useEffect(() => {
    // Function to fetch creators from the backend
    const fetchCreators = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("https://mac-backend-six.vercel.app/creators");
        const data = await response.json();
        setCreators(data); // Update state with fetched creators
      } catch (error) {
        console.error("Error fetching creators:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreators();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setFormValues({ ...formValues, [field]: e.target.value });
  };

  async function createReference(link: string, reference: string, announcementId: string) {
    const body = JSON.stringify({
      link,
      reference,
      active: false,
      announcementId,
    });

    try {
      const response = await fetch("https://mac-backend-six.vercel.app/references", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();
      console.log("Reference created:", data);
    } catch (error) {
      console.error("Error creating reference:", error);
    }
  }

  async function checkAdvertiser(companyEmail: string) {
    try {
      const response = await fetch("https://mac-backend-six.vercel.app/announcers", {
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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, creator: Creator) => {
    e.preventDefault();
    const anunciante = user.email; // Assuming the user's email is the advertiser's name

    const cpmBlockchainAmount = Math.round(parseFloat(formValues.cpm) * 100);
    const totalDollarsBlockchainAmount = Math.round(parseFloat(formValues.totalDollars) * 100);

    //const paymentTokenAddress = "0x049e5c0e9fbb072d7f908e77e117c76d026b8daf9720fe1d74fa3309645eabce"; //Insert the address according to CC Token
    const payPerClickAddress = "0x02aa201c09f47146f54f1ab593f520a6b66672b6a99b6f2f082a148e7e9b1483";

    const PPCContract = new Contract(PayPerClickABI, payPerClickAddress, provider);

    // const call = {
    //   contractAddress: payPerClickAddress,
    //   entrypoint: 'createPartnership',
    //   calldata: [
    //     creator.walletAddress,
    //     3,
    //     cpmBlockchainAmount,
    //     totalDollarsBlockchainAmount
    //   ]
    // };

    const linkParametrizado = `https://mac-url.vercel.app/${formValues.parameter}`;

    try {
      const advertiserData = await checkAdvertiser(anunciante);

      const idCampanha = await createCampaign(
        formValues.description,
        creator.paymentToken,
        parseFloat(formValues.cpm),
        anunciante,
        creator.email,
        linkParametrizado,
        parseInt(formValues.totalDollars),
        advertiserData.walletAddress,
        creator.walletAddress,
      );

      console.log("Form submitted with values:", formValues);
      console.log("Created campaign id:", idCampanha);

      const reference = "/" + formValues.parameter;
      createReference(formValues.link, reference, idCampanha);

      setIsFormSubmitted(true); // Set the form submission status to true

      await PPCContract.createPartnership(creator.walletAddress, 1, cpmBlockchainAmount, totalDollarsBlockchainAmount);
      //  await PPCContract.createPartnership("0x0684e73232a2a3C66f8678Ff9450C8D8CF1Fe17BF73B45a8Db21a5a2EfF9e51a", 3, 20, 40);
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex flex-col px-5">
          <h1 className="text-left mb-10">
            <span className="block text-5xl font-semibold mb-6">Find the perfect creator to advertise</span>
            <span className="block text-xl">Check out creators with the ideal profile for your company</span>
          </h1>
        </div>

        <div className="bg-base-300 w-full mt-2 px-8 py-12 flex justify-center">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl">
              {/* Map over creatorsData to display each creator's information */}
              {creators.map((creator, index) => (
                <div key={creator._id}>
                  <div
                    className="flex flex-col bg-base-100 px-10 pt-4 pb-10 min-h-[400px] text-center items-center max-w-xs rounded-xl shadow-lg transition-transform duration-300"
                    onMouseOver={e => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <p className="font-bold text-xl mb-0">{creator.name}</p>
                    <Link
                      className="text-blue-500 hover:text-blue-800 visited:text-purple-600 text-md mt-0 mb-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={creator.link}
                      passHref
                    >
                      {creator.occupation}
                    </Link>
                    <p className="italic text-sm my-0">{creator.targetAudience}</p>
                    <p className="text-sm my-1"> {creator.email} </p>
                    <p className="text-sm my-1">
                      {" "}
                      ${parseFloat(creator.CPM.$numberDecimal).toFixed(2)} per 1000 clicks
                    </p>
                    <div className="flex flex-row items-center gap-2 my-1">
                      <StarIcon className="h-4 w-4" />
                      <p className="text-sm m-0"> {parseFloat(creator.stars.$numberDecimal).toFixed(1)} / 5.0</p>
                    </div>
                    <p className="text-sm mb-4 text-gray-500 my-0 overflow-y-auto max-h-[7em] line-clamp-5">
                      {creator.biography}
                    </p>
                    {user && user.type === "advertiser" && (
                      <button
                        className="mt-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full shadow-md"
                        onClick={() => {
                          setVisibleDropdown(visibleDropdown === index ? null : index);
                          setIsFormSubmitted(false); // Reset the form submission status
                        }}
                      >
                        Book
                      </button>
                    )}

                    {/* Dropdown Banner */}
                    {!isFormSubmitted && visibleDropdown === index && (
                      <div
                        className="bg-gray-200 w-full mt-3 p-2 text-center items-center max-w-xs mx-auto shadow-sm rounded-sm transition-transform duration-300"
                        style={{ marginLeft: "-20px", marginRight: "-20px", width: "calc(100% + 40px)" }}
                      >
                        <form onSubmit={e => handleSubmit(e, creator)}>
                          <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="description">
                              Description
                            </label>
                            <textarea
                              id="description"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              value={formValues.description}
                              onChange={e => handleInputChange(e, "description")}
                              rows={2}
                            />
                          </div>
                          <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="totalDollars">
                              Total US$ for the campaign
                            </label>
                            <input
                              id="totalDollars"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="text"
                              value={formValues.totalDollars}
                              onChange={e => handleInputChange(e, "totalDollars")}
                            />
                          </div>
                          <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="cpm">
                              CPM
                            </label>
                            <input
                              id="cpm"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="text"
                              value={formValues.cpm}
                              onChange={e => handleInputChange(e, "cpm")}
                            />
                          </div>
                          <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="link">
                              Link
                            </label>
                            <input
                              id="link"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="text"
                              value={formValues.link}
                              onChange={e => handleInputChange(e, "link")}
                            />
                          </div>
                          <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="parameter">
                              Parameter
                            </label>
                            <input
                              id="parameter"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="text"
                              value={formValues.parameter}
                              onChange={e => handleInputChange(e, "parameter")}
                            />
                          </div>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
