import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { MacAppWithProviders } from "~~/components/MacAppWithProviders";
import "~~/styles/globals.css";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : `http://localhost:${3000}`;
const imageUrl = `${baseUrl}/thumbnail.png`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "MAC App",
    template: "%s | MAC",
  },
  description: "Built by Prisma Tech",
  openGraph: {
    title: {
      default: "MAC App",
      template: "%s | MAC",
    },
    description: "Built by Prisma Tech",
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
      default: "MAC",
      template: "%s | MAC",
    },
    description: "Built by Prisma Tech",
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
};

const MacApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <MacAppWithProviders>{children}</MacAppWithProviders>
      </body>
    </html>
  );
};

export default MacApp;
