import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { AvalancheMacAppWithProviders } from "~~/components/AvalancheMacAppWithProviders";
import "~~/styles/globals.css";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : `http://localhost:${process.env.PORT}`;
const imageUrl = `${baseUrl}/thumbnail.png`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Avalanche MAC App",
    template: "%s | Avalanche MAC",
  },
  description: "Built by RGB Group",
  openGraph: {
    title: {
      default: "Avalanche MAC App",
      template: "%s | Avalanche MAC",
    },
    description: "Built by RGB Group",
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: "Avalanche MAC",
      template: "%s | Avalanche MAC",
    },
    description: "Built by RGB Group",
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
};

const AvalancheMacApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <AvalancheMacAppWithProviders>{children}</AvalancheMacAppWithProviders>
      </body>
    </html>
  );
};

export default AvalancheMacApp;
