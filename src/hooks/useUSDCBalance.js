import { useState, useEffect } from "react";
import { createPublicClient, getContract, http } from "viem";
import { erc20Abi } from "viem";
import { arbitrumSepolia } from "viem/chains";

// Official USDC contract address on Arbitrum Sepolia per Circle docs
const USDC_ADDRESS = "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d";

export function useUSDCBalance(address) {
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    if (!address) {
      setBalance("0");
      return;
    }

    async function fetchBalance() {
      try {
        // Setup client for Arbitrum Sepolia
        const client = createPublicClient({
          chain: arbitrumSepolia,
          transport: http(),
        });

        // Setup USDC contract interface
        const usdcContract = getContract({
          client,
          address: USDC_ADDRESS,
          abi: erc20Abi,
        });

        // Read raw balance (uint256)
        const rawBalance = await usdcContract.read.balanceOf([address]);

        // USDC decimals: 6, convert to human readable string with fixed decimals
        const formattedBalance = (Number(rawBalance) / 1e6).toFixed(6);

        setBalance(formattedBalance);
      } catch (error) {
        console.error("Failed to fetch USDC balance:", error);
        setBalance("0");
      }
    }

    fetchBalance();
  }, [address]);

  return balance;
}
