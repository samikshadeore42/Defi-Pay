import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { WagmiProvider, createConfig, http } from "wagmi";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

import { CHAIN_CONFIGS } from "./constants/chain";

const chains = Object.values(CHAIN_CONFIGS).map((c) => c.viemChain);
const queryClient = new QueryClient();

const { connectors } = getDefaultWallets({
  appName: "DeFi-Pay+",
  projectId: "1a01bf568da38a96f4bd2a5a3cb9568b",
});

const transports = {};
for (const [id, cfg] of Object.entries(CHAIN_CONFIGS)) {
  transports[cfg.viemChain.id] = http();
}

const config = createConfig({
  connectors,
  chains,
  transports,
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
