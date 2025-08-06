import React, { useMemo } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId } from "wagmi";
import { arbitrumSepolia, baseSepolia, avalancheFuji } from "wagmi/chains";
import { useSmartAccount } from "./hooks/useSmartAccount.js";
import { useUSDCBalance } from "./hooks/useUSDCBalance.js";

export default function App() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  // Map chainId to chain object
  const chain = useMemo(() => {
    const chains = [arbitrumSepolia, baseSepolia, avalancheFuji];
    return chains.find((c) => c.id === chainId);
  }, [chainId]);

  const smartAccount = useSmartAccount();
  const usdcBalance = useUSDCBalance(smartAccount);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">DeFi-Pay+</h1>
      <ConnectButton />

      {isConnected && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center w-full max-w-xl">
          <p className="mb-2">
            <strong>EOA Address:</strong>{" "}
            <span className="font-mono break-all">{address}</span>
          </p>
          <p className="mb-6">
            <strong>Connected Network:</strong>{" "}
            {chain?.name || `Unknown (ID: ${chainId})`}
          </p>
          {smartAccount ? (
            <>
              <p className="mb-2">
                <strong>Smart Account Address:</strong>{" "}
                <span className="font-mono break-all">{smartAccount}</span>
              </p>
              <p className="mb-4">
                <strong>USDC Balance:</strong> {usdcBalance} USDC
              </p>
              {Number(usdcBalance) < 1 && (
                <div className="bg-yellow-100 text-yellow-800 p-3 rounded">
                  Your smart account has less than 1 USDC. Please fund it using{" "}
                  <a
                    href="https://faucet.circle.com"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-indigo-600"
                  >
                    Circle Testnet Faucet
                  </a>{" "}
                  to proceed.
                </div>
              )}
            </>
          ) : (
            <p>Loading smart account address…</p>
          )}
        </div>
      )}
    </div>
  );
}
