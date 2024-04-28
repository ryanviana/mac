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
        <Toaster /> {/* Use Toaster from react-hot-toast */}
      </div>
    </>
  );
};

export const MacAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
      <UserProvider>
        <MacApp>{children}</MacApp>
      </UserProvider>
  );
};
