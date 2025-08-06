import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId } from "wagmi";
import { useSmartAccount } from "./hooks/useSmartAccount.js";
import { useUSDCBalance } from "./hooks/useUSDCBalance.js";
import { CHAIN_CONFIGS } from "./constants/chain";

export default function App() {
  const { address, isConnected } = useAccount();
  const walletChainId = useChainId();

  // All supported chain IDs from config
  const supportedChainIds = Object.keys(CHAIN_CONFIGS).map(Number);

  // Selected chain state (default to connected, fallback to first supported)
  const [selectedChainId, setSelectedChainId] = useState(
    supportedChainIds.includes(walletChainId) ? walletChainId : supportedChainIds[0]
  );

  // Sync to wallet network when it changes, unless user explicitly changes
  useEffect(() => {
    if (supportedChainIds.includes(walletChainId)) {
      setSelectedChainId(walletChainId);
    }
  }, [walletChainId]);

  // Dynamic chain and hooks
  const chainObj = CHAIN_CONFIGS[selectedChainId]?.viemChain;
  const smartAccount = useSmartAccount(selectedChainId);
  const usdcBalance = useUSDCBalance(smartAccount, selectedChainId);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">DeFi-Pay+</h1>
      <ConnectButton />
      {isConnected && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center w-full max-w-xl">
          <p className="mb-2">
            <strong>EOA Address:</strong>
            <span className="font-mono break-all"> {address}</span>
          </p>
          <p className="mb-2">
            <strong>Displaying info for:</strong> {chainObj?.name} (ID: {selectedChainId})
          </p>
          {/* Smart Account && USDC Info */}
          <p className="mb-2">
            <strong>Smart Account Address:</strong>
            <span className="font-mono break-all"> {smartAccount ?? "Loading..."}</span>
          </p>
          <p className="mb-4">
            <strong>USDC Balance:</strong> {usdcBalance !== null ? `${usdcBalance} USDC` : "Loading..."}
          </p>
          {usdcBalance !== null && Number(usdcBalance) < 1 && (
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded">
              Your smart account has less than 1 USDC. Please fund it using
              <a
                href="https://faucet.circle.com"
                target="_blank"
                rel="noreferrer"
                className="underline text-indigo-600 ml-1"
              >
                Circle Testnet Faucet
              </a>
              {" "}to proceed.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
