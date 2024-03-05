"use client";

import { WalletEntryPosition } from "@particle-network/auth";
import { BNBChainTestnet } from "@particle-network/chains";
import { ModalProvider } from "@particle-network/connect-react-ui";
import "@particle-network/connectkit/dist/index.css";
import { Toaster } from "react-hot-toast";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { UserProvider } from "~~/context/globalState";

const MacApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="relative flex flex-col flex-grow: 1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export const MacAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider
      options={{
        projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID as string,
        clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY as string,
        appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID as string,
        chains: [BNBChainTestnet],
        particleWalletEntry: {
          displayWalletEntry: true, //display wallet button when connect particle success.
          defaultWalletEntryPosition: WalletEntryPosition.BR, // BR = Circle opens on bottom right
          // supportChains: [],
        },
      }}
      theme={"auto"}
      walletSort={["Particle Auth", "Wallet"]} // Wallet order
    >
      <UserProvider>
        <MacApp>{children}</MacApp>
      </UserProvider>
    </ModalProvider>
  );
};
