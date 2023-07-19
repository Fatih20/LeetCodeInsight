import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import SelectedVisualizationProvider from "@/providers/SelectedVisualizationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twenty Shades of LeetCode",
  description: "20 diagrams and analysis of the problems in LeetCode",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <Providers>
        <SelectedVisualizationProvider>
          <body className={inter.className}>{children}</body>
        </SelectedVisualizationProvider>
      </Providers>
    </html>
  );
}
