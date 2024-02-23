"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { BuildingStorefrontIcon, UserIcon } from "@heroicons/react/24/solid";
import { useUser } from "~~/context/globalState";

const LoginPage: NextPage = () => {
  // State to store email and password input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedType, setSelectedType] = useState("none");
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function createNewCreator(email: string) {
    const body = JSON.stringify({
      name: "define",
      biography: "define",
      occupation: "define",
      targetAudience: "define",
      stars: 0,
      link: "define",
      email: email,
      CPM: 0,
      walletAddress: "define",
    });

    try {
      const response = await fetch("https://mac-backend-six.vercel.app/creators", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();
      console.log("Creator created:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function checkCreator(email: string) {
    try {
      const response = await fetch("https://mac-backend-six.vercel.app/creators", {
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
        const newCreator = createNewCreator(email);
        console.log("New Creator:", newCreator);
        return newCreator;
      }
    } catch (error) {
      console.error("Error:", error);
      return []; // Return an empty array in case of an error
    }
  }

  async function createNewAdvertiser(email: string) {
    const body = JSON.stringify({
      razaoSocial: "define",
      quantidadeAnunciosFeitos: 0,
      stars: 0,
      link: "define",
      email: email,
      walletAddress: "0xTeste",
    });

    try {
      const response = await fetch("https://mac-backend-six.vercel.app/announcers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();
      console.log("Advertiser created:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
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
        const newAdvertiser = createNewAdvertiser(companyEmail);
        console.log("New Advertiser:", newAdvertiser);
        return newAdvertiser;
      }
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      let foundUser;

      if (selectedType === "advertiser") {
        foundUser = await checkAdvertiser(email);
      } else if (selectedType === "creator") {
        foundUser = await checkCreator(email);
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
        body: JSON.stringify({ email, type: selectedType }),
      });

      if (!response.ok) {
        throw new Error("Login request failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      router.push("/home");
    } catch (error) {
      console.error("An error occurred during the login process: ", error);
    } finally {
      setIsLoading(false); // Reset loading status
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

        <div className="border border-blue-700 w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-4/12 2xl:w-3/12 sm:px-10 sm:py-6 bg-base-100 rounded-xl shadow-lg">
          <h2 className="text-center mt-8 font-semibold text-3xl lg:text-4xl">
            Login {selectedType === "advertiser" ? "as Advertiser" : selectedType === "creator" ? "as Creator" : ""}
          </h2>
          <form className="mt-10" onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-xs font-semibold uppercase">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Type your e-mail"
              autoComplete="email"
              className="block w-full py-3 px-2 mt-2 appearance-none 
                border-b-2 border-gray-300
                focus:text-gray-500 focus:outline-none focus:border-indigo-300"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password" className="block mt-10 text-xs font-semibold uppercase">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Type your password"
              autoComplete="current-password"
              className="block w-full py-3 px-2 mt-2 mb-4 appearance-none 
                border-b-2 border-gray-300
                focus:text-gray-500 focus:outline-none focus:border-indigo-300"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`w-full py-3 mt-10 ${isLoading ? "bg-indigo-300" : "bg-indigo-600"} rounded-md
              font-medium text-white uppercase
              focus:outline-none hover:bg-indigo-700 hover:shadow-none`}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? "LOADING..." : "Login"}
            </button>
            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <div className="flex-2 underline text-indigo-600 hover:text-indigo-800">Forgot password</div>

              <p className="flex-1 text-gray-700 text-md mx-4 my-1 sm:my-auto">or</p>

              <div className="flex-2 underline text-indigo-600 hover:text-indigo-800">Register</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
