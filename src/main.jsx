import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { WagmiProvider, createConfig, http } from "wagmi";
import { arbitrumSepolia, baseSepolia, avalancheFuji } from "wagmi/chains";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

// List the chains you want to support
const chains = [arbitrumSepolia, baseSepolia, avalancheFuji];
const queryClient = new QueryClient();

// Set up default wallet connectors (replace w/ your projectId if available)
const { connectors } = getDefaultWallets({
  appName: "DeFi-Pay+",
  projectId: "1a01bf568da38a96f4bd2a5a3cb9568b", // replace for mainnet, or use dummy for test/dev
});

// Wagmi v2+ config (no publicProvider/configureChains!)
const config = createConfig({
  connectors,
  chains,
  transports: {
    [arbitrumSepolia.id]: http(),
    [baseSepolia.id]: http(),
    [avalancheFuji.id]: http(),
  },
  ssr: false,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <WagmiProvider config={config}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiProvider>
  </QueryClientProvider>
);

